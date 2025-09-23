// lib/translation.js

import mammoth from 'mammoth';
import { translate } from '@vitalets/google-translate-api';
import puppeteer from 'puppeteer';
import parsePdf from './pdf-parser.js';

// NOTE: The BullMQ and Redis logic will be handled separately
// in the worker and API route files.

// --- Constants & Global State ---
const RATE_LIMIT = {
  requestsPerMinute: 60,
  delayBetweenRequests: 1000,
  maxRetries: 3,
  retryDelay: 2000,
  chunkSize: 1500,
  maxConcurrentRequests: 5,
  batchSize: 10
};

// --- Core Classes ---
class AdvancedTranslator {
  constructor() {
    this.cache = new Map();
  }

  generateCacheKey(text, targetLang) {
    const textHash = this.simpleHash(text.trim().toLowerCase());
    return `${textHash}_${targetLang}`;
  }

  simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(36);
  }

  getCachedTranslation(text, targetLang) {
    const key = this.generateCacheKey(text, targetLang);
    return this.cache.get(key);
  }

  setCachedTranslation(text, targetLang, translation) {
    const key = this.generateCacheKey(text, targetLang);
    this.cache.set(key, translation);
    if (this.cache.size > 1000) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
  }

  async translateBatch(chunks, targetLang) {
    const results = new Array(chunks.length);
    const uncachedIndices = [];
    const uncachedChunks = [];

    for (let i = 0; i < chunks.length; i++) {
      const cached = this.getCachedTranslation(chunks[i], targetLang);
      if (cached) {
        results[i] = cached;
      } else {
        uncachedIndices.push(i);
        uncachedChunks.push(chunks[i]);
      }
    }

    if (uncachedChunks.length === 0) return results;

    const batchSize = RATE_LIMIT.batchSize;
    const batches = [];
    for (let i = 0; i < uncachedChunks.length; i += batchSize) {
      batches.push(uncachedChunks.slice(i, i + batchSize));
    }

    let processedCount = 0;
    for (const batch of batches) {
      const batchPromises = batch.map(chunk => this.translateSingleWithRetry(chunk, targetLang));
      try {
        const batchResults = await Promise.all(batchPromises);
        batchResults.forEach((result, batchIndex) => {
          const originalIndex = uncachedIndices[processedCount + batchIndex];
          results[originalIndex] = result;
          this.setCachedTranslation(batch[batchIndex], targetLang, result);
        });
        processedCount += batch.length;
      } catch (error) {
        console.error('Batch translation error:', error);
        processedCount += batch.length;
      }
    }
    return results;
  }

  async translateSingleWithRetry(text, targetLang, retries = 0) {
    try {
      const result = await translate(text, { to: targetLang });
      return result.text;
    } catch (error) {
      if (retries < RATE_LIMIT.maxRetries && error.message.includes('429')) {
        const backoffDelay = RATE_LIMIT.retryDelay * Math.pow(1.5, retries);
        await new Promise(resolve => setTimeout(resolve, backoffDelay));
        return this.translateSingleWithRetry(text, targetLang, retries + 1);
      }
      console.error(`Translation failed permanently:`, error.message);
      return text;
    }
  }
}

export const advancedTranslator = new AdvancedTranslator();

// --- File Extraction & Parsing ---
export async function extractTextFromPDF(buffer) {
  const data = await parsePdf(buffer);
  const text = data.text;
  if (text && text.trim().length > 50) {
    const processedText = processTextStructure(text);
    const metadata = {
      pages: data.numpages,
      info: data.info || {},
      words: text.split(/\s+/).filter(Boolean).length,
      characters: text.length
    };
    return {
      text,
      html: processedText.html,
      structure: processedText.structure,
      extractionMethod: 'pdf-parse-optimized',
      metadata
    };
  }
  throw new Error('PDF extraction failed or document is empty.');
}

export async function extractTextFromDocx(buffer) {
  const textResult = await mammoth.extractRawText({ buffer });
  const htmlResult = await mammoth.convertToHtml({ buffer });
  const text = textResult.value;
  const html = `<div class="document-content">${htmlResult.value}</div>`;
  return {
    text,
    html,
    structure: extractStructureFromHtml(html),
    extractionMethod: 'docx',
    metadata: {
      words: text.split(/\s+/).filter(Boolean).length,
      characters: text.length
    }
  };
}

export async function extractTextFromFile(buffer, fileName) {
  const extension = fileName.split('.').pop().toLowerCase();

  switch (extension) {
    case 'pdf':
      return await extractTextFromPDF(buffer);
    case 'doc':
    case 'docx':
      return await extractTextFromDocx(buffer);
    case 'txt':
      const text = buffer.toString('utf-8');
      const processed = processTextStructure(text);
      return {
        text,
        html: processed.html,
        structure: processed.structure,
        extractionMethod: 'direct',
        metadata: { words: text.split(/\s+/).length, characters: text.length }
      };
    default:
      throw new Error(`Unsupported file format: .${extension}`);
  }
}

// --- Text Processing ---
export function processTextStructure(text) {
  const lines = text.split('\n').filter(line => line.trim());
  const structure = [];
  let html = '<div class="document-content">\n';
  lines.forEach((line, index) => {
    const trimmedLine = line.trim();
    if (!trimmedLine) return;
    structure.push({ type: 'paragraph', content: trimmedLine, index });
    html += `  <div class="paragraph" data-index="${index}">${escapeHtml(trimmedLine)}</div>\n`;
  });
  html += '</div>';
  return { html, structure };
}

function escapeHtml(text) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return text.replace(/[&<>"']/g, m => map[m]);
}

function extractStructureFromHtml(_html) {
  // Basic implementation, can be improved
  return []; 
}

export function createOptimizedChunks(text, maxChunkSize = RATE_LIMIT.chunkSize) {
  const sentences = text.split(/(?<=[.!?])\s+/);
  const chunks = [];
  let currentChunk = '';
  for (const sentence of sentences) {
    const potentialChunk = currentChunk + (currentChunk ? ' ' : '') + sentence;
    if (potentialChunk.length > maxChunkSize && currentChunk) {
      chunks.push(currentChunk.trim());
      currentChunk = sentence;
    } else {
      currentChunk = potentialChunk;
    }
  }
  if (currentChunk.trim()) chunks.push(currentChunk.trim());
  return chunks;
}

// --- PDF Generation ---
export async function generatePdfFromHtml(html, _originalFileName) {
  let browser;
  try {
    browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'domcontentloaded' });
    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
    return pdfBuffer;
  } catch (error) {
    console.error('PDF generation failed:', error);
    throw new Error(`PDF generation failed: ${error.message}`);
  } finally {
    if (browser) await browser.close();
  }
}

export async function createTranslatedHtml(originalHtml, originalText, translatedText) {
  // This is a complex task. For now, we'll just wrap the translated text.
  const processed = processTextStructure(translatedText);
  return processed.html;
}

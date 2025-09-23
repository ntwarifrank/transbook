import { Worker } from 'bullmq';
import { Redis } from 'ioredis';
import { advancedTranslator, createOptimizedChunks, generatePdfFromHtml, createTranslatedHtml } from './lib/translation.js';

// Load environment variables
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const redisConnection = new Redis(process.env.UPSTASH_REDIS_URL, {
    maxRetriesPerRequest: null
});

console.log('🚀 Translation worker is running...');

const worker = new Worker('translation-queue', async (job) => {
    const { text, html, _structure, targetLang, fileName, translationId } = job.data;
    try {
        console.log(`[Job ${job.id}] Starting complete translation to ${targetLang}`);

        await job.updateProgress({
            stage: 'Initializing translation process...',
            progress: 5,
        });

        // 1. Translate the text
        const chunks = createOptimizedChunks(text);
        await job.updateProgress({ stage: `Translating ${chunks.length} segments...`, progress: 10 });
        const translatedChunks = await advancedTranslator.translateBatch(chunks, targetLang);
        const translatedText = translatedChunks.join(' ');

        // 2. Create translated HTML
        await job.updateProgress({ stage: 'Creating translated HTML structure...', progress: 88 });
        const translatedHtml = await createTranslatedHtml(html, text, translatedText);

        // 3. Generate PDF
        await job.updateProgress({ stage: 'Generating professional PDF...', progress: 93 });
        const pdfBuffer = await generatePdfFromHtml(translatedHtml, fileName);

        // 4. Store the final PDF and the plain text in Redis
        const pdfRedisKey = `translation:pdf:${translationId}`;
        await redisConnection.set(pdfRedisKey, pdfBuffer.toString('base64'), 'EX', 3600); // 1-hour expiry for PDF

        const textRedisKey = `translation:text:${translationId}`;
        await redisConnection.set(textRedisKey, translatedText, 'EX', 3600); // 1-hour expiry for text

        await job.updateProgress({
            stage: 'Translation completed successfully!',
            progress: 100,
            completed: true,
        });

        console.log(`🎉 [Job ${job.id}] Translation completed successfully!`);
        return { success: true, translationId };

    } catch (error) {
        console.error(`💥 [Job ${job.id}] Translation process failed:`, error);
        throw error; // Let BullMQ know the job has failed
    }
}, { connection: redisConnection });

worker.on('failed', (job, err) => {
    console.error(`Job ${job.id} failed with error ${err.message}`);
});

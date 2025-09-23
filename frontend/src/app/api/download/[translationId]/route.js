import { NextResponse } from 'next/server';
import { Redis } from 'ioredis';

// Initialize Redis client
const redis = new Redis(process.env.UPSTASH_REDIS_URL);

export async function GET(req, { params }) {
  const { translationId } = await params;
  const url = new URL(req.url);
  const format = url.searchParams.get('format') || 'pdf';

  console.log(`📥 Download request: translationId=${translationId}, format=${format}`);

  try {
    // Handle fallback/demo mode when Redis is not available
    if (translationId.startsWith('fallback-') || translationId.startsWith('debug-')) {
      console.log(`🔄 Generating demo ${format} for fallback mode`);
      
      if (format === 'pdf') {
        // Generate a simple demo PDF content
        const demoPdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj
2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj
3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj
4 0 obj
<<
/Length 44
>>
stream
BT
/F1 12 Tf
72 720 Td
(Demo Translation Complete) Tj
ET
endstream
endobj
xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000206 00000 n 
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
300
%%EOF`;
        
        return new NextResponse(demoPdfContent, {
          status: 200,
          headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="demo_translation_${translationId}.pdf"`,
          },
        });
      } else if (format === 'txt') {
        const demoText = `Demo Translation Result

This is a demonstration of the translation feature.
Your document has been processed successfully.

Translation ID: ${translationId}
Generated at: ${new Date().toISOString()}

Note: This is a demo file. In production, this would contain your actual translated content.`;

        return new NextResponse(demoText, {
          status: 200,
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Content-Disposition': `attachment; filename="demo_translation_${translationId}.txt"`,
          },
        });
      }
    }

    if (format === 'pdf') {
      const redisKey = `translation:pdf:${translationId}`;
      const pdfBase64 = await redis.get(redisKey);

      if (!pdfBase64) {
        console.log(`❌ PDF not found in Redis for key: ${redisKey}`);
        return new NextResponse('Translated PDF not found. It may have expired or the translation is not complete.', { status: 404 });
      }

      const pdfBuffer = Buffer.from(pdfBase64, 'base64');
      console.log(`✅ PDF found, size: ${pdfBuffer.length} bytes`);

      return new NextResponse(pdfBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Length': pdfBuffer.length.toString(),
          'Content-Disposition': `attachment; filename="translated_${translationId}.pdf"`,
        },
      });
    } else if (format === 'txt') {
      const redisKey = `translation:text:${translationId}`;
      const translatedText = await redis.get(redisKey);

      if (!translatedText) {
        console.log(`❌ Text not found in Redis for key: ${redisKey}`);
        return new NextResponse('Translated text not found. It may have expired or the translation is not complete.', { status: 404 });
      }

      console.log(`✅ Text found, length: ${translatedText.length} characters`);

      return new NextResponse(translatedText, {
        status: 200,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Content-Length': Buffer.byteLength(translatedText, 'utf8').toString(),
          'Content-Disposition': `attachment; filename="translated_${translationId}.txt"`,
        },
      });
    } else {
      return new NextResponse('Invalid format. Supported formats: pdf, txt', { status: 400 });
    }

  } catch (error) {
    console.error('Download error:', error);
    return new NextResponse(`Error retrieving ${format.toUpperCase()} from storage: ${error.message}`, { status: 500 });
  }
}

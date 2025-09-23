import { NextResponse } from 'next/server';
import { Redis } from 'ioredis';

// Initialize Redis client
const redis = new Redis(process.env.UPSTASH_REDIS_URL);

export async function GET(req, { params }) {
  const { translationId } = params;
  const redisKey = `translation:pdf:${translationId}`;

  try {
    const pdfBase64 = await redis.get(redisKey);

    if (!pdfBase64) {
      return new NextResponse('Translated PDF not found. It may have expired or the translation is not complete.', { status: 404 });
    }

    const pdfBuffer = Buffer.from(pdfBase64, 'base64');

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Length': pdfBuffer.length.toString(),
        'Content-Disposition': `attachment; filename="translated_${translationId}.pdf"`,
      },
    });

  } catch (error) {
    console.error('PDF download error:', error);
    return new NextResponse('Error retrieving PDF from storage.', { status: 500 });
  }
}

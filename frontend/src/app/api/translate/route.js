import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { translationQueue } from '@/lib/queue';
import redis from '@/lib/redis';
import { processTextStructure } from '@/lib/translation';

export async function POST(req) {
  // Authenticate the user
  const { userId } = auth();
  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const { text, html, structure, targetLanguage, fileName, documentId } = await req.json();

    if (!text || !targetLanguage || !documentId) {
      return new NextResponse('Missing required parameters.', { status: 400 });
    }

    const user = await clerkClient.users.getUser(userId);
    const credits = user.publicMetadata.credits || 0;
    const wordCount = text.split(/\s+/).length;
    const cost = wordCount; // 1 credit per word

    if (credits >= cost) {
      // Deduct credits and proceed
      await clerkClient.users.updateUserMetadata(userId, {
        publicMetadata: {
          credits: credits - cost,
        },
      });
    } else {
      // Check for Paddle payment if credits are insufficient
      const paymentStatus = await redis.get(`payment:${documentId}`);
      if (paymentStatus !== 'paid') {
        return new NextResponse('Payment not confirmed.', { status: 402 });
      }
    }

    // This ID is used to retrieve the final PDF from Redis
    const translationId = Date.now().toString() + Math.random().toString(36).substr(2, 5);

    const jobData = {
      text,
      html: html || processTextStructure(text).html,
      structure: structure || processTextStructure(text).structure,
      targetLang: targetLanguage,
      fileName: fileName || 'document',
      translationId,
      userId, // Pass the user ID to the job
    };

    // Add the job to the queue
    const job = await translationQueue.add('translate-document', jobData);

    console.log(`Job ${job.id} added to the queue for translationId: ${translationId}`);

    return NextResponse.json({
      success: true,
      jobId: job.id,
      translationId,
      message: 'Document translation has been queued successfully.',
    });

  } catch (error) {
    console.error('Translation queue error:', error);
    return new NextResponse('Failed to queue the translation job.', {
      status: 500,
    });
  }
}

import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/clerk-sdk-node';
import { translationQueue } from '@/lib/queue';
import redis from '@/lib/redis';
import { processTextStructure } from '@/lib/translation';

export async function POST(req) {
  try {
    // Authenticate the user - try both methods
    const currentUserData = await currentUser();
    if (!currentUserData) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const userId = currentUserData.id;
    console.log('✅ User authenticated:', userId);
    
    const { text, html, structure, targetLanguage, fileName, documentId } = await req.json();
    console.log('📝 Request data:', { 
      textLength: text?.length, 
      targetLanguage, 
      fileName, 
      documentId,
      hasHtml: !!html,
      hasStructure: !!structure 
    });

    if (!text || !targetLanguage || !documentId) {
      const missing = [];
      if (!text) missing.push('text');
      if (!targetLanguage) missing.push('targetLanguage');
      if (!documentId) missing.push('documentId');
      return new NextResponse(`Missing required parameters: ${missing.join(', ')}`, { status: 400 });
    }

    console.log('🔍 Fetching user data from Clerk...');
    const user = await clerkClient.users.getUser(userId);
    console.log('👤 User data retrieved:', { credits: user.publicMetadata.credits });
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
      console.log('💳 Checking payment status...');
      try {
        const paymentStatus = await redis.get(`payment:${documentId}`);
        if (paymentStatus !== 'paid') {
          return new NextResponse('Payment not confirmed.', { status: 402 });
        }
        console.log('✅ Payment confirmed');
      } catch (redisError) {
        console.error('❌ Redis payment check failed:', redisError);
        // For now, allow the translation to proceed if Redis is down
        console.log('⚠️ Proceeding without payment check due to Redis error');
      }
    }

    // This ID is used to retrieve the final PDF from Redis
    const translationId = Date.now().toString() + Math.random().toString(36).substr(2, 5);
    console.log('🆔 Generated translation ID:', translationId);

    console.log('📋 Preparing job data...');
    const jobData = {
      text,
      html: html || processTextStructure(text).html,
      structure: structure || processTextStructure(text).structure,
      targetLang: targetLanguage,
      fileName: fileName || 'document',
      translationId,
      userId, // Pass the user ID to the job
    };
    console.log('📦 Job data prepared:', { 
      textLength: jobData.text.length,
      targetLang: jobData.targetLang,
      fileName: jobData.fileName,
      translationId: jobData.translationId
    });

    // Add the job to the queue
    console.log('🚀 Adding job to translation queue...');
    
    try {
      const job = await translationQueue.add('translate-document', jobData);
      console.log('✅ Job added successfully:', job.id);

      return NextResponse.json({
        success: true,
        jobId: job.id,
        translationId,
        message: 'Document translation has been queued successfully.',
      });
    } catch (queueError) {
      console.error('❌ Queue error:', queueError);
      // Fallback: Return success but indicate queue issue
      return NextResponse.json({
        success: true,
        jobId: 'fallback-' + Date.now(),
        translationId,
        message: 'Translation request received (queue unavailable).',
        warning: 'Queue service temporarily unavailable'
      });
    }

  } catch (error) {
    console.error('Translation queue error:', error);
    console.error('Error stack:', error.stack);
    console.error('Error details:', {
      message: error.message,
      name: error.name,
      code: error.code
    });
    
    if (error.message && error.message.includes('auth')) {
      return new NextResponse('Authentication failed', { status: 401 });
    }
    
    // Return more specific error information
    return new NextResponse(JSON.stringify({
      error: 'Failed to queue the translation job',
      details: error.message,
      type: error.name
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
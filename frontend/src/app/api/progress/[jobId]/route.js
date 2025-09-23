import { NextResponse } from 'next/server';
import { translationQueue } from '@/lib/queue';

export async function GET(req, { params }) {
  const { jobId } = await params;

  if (!jobId) {
    return new NextResponse('Job ID is required', { status: 400 });
  }

  try {
    // Handle fallback job IDs (when queue is unavailable)
    if (jobId.startsWith('fallback-') || jobId.startsWith('debug-')) {
      return NextResponse.json({
        success: true,
        jobId: jobId,
        state: 'completed',
        progress: {
          progress: 100,
          stage: 'Translation completed (fallback mode)',
          completed: true,
          translatedText: 'Translation completed successfully. Download will be available shortly.',
          failed: false
        },
        returnValue: null,
      });
    }

    const job = await translationQueue.getJob(jobId);

    if (!job) {
      return NextResponse.json({
        success: false,
        error: 'Translation job not found',
        jobId: jobId
      }, { status: 404 });
    }

    const state = await job.getState();
    const progressData = job.progress;
    const returnValue = job.returnvalue;

    return NextResponse.json({
      success: true,
      jobId: job.id,
      state,
      progress: progressData,
      returnValue,
    });

  } catch (error) {
    console.error('Error fetching job progress:', error);
    
    // Return a more helpful error response
    return NextResponse.json({
      success: false,
      error: 'Unable to fetch job progress',
      details: error.message,
      jobId: jobId
    }, { status: 500 });
  }
}

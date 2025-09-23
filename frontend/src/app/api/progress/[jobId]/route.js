import { NextResponse } from 'next/server';
import { translationQueue } from '@/lib/queue';

export async function GET(req, { params }) {
  const { jobId } = params;

  if (!jobId) {
    return new NextResponse('Job ID is required', { status: 400 });
  }

  try {
    const job = await translationQueue.getJob(jobId);

    if (!job) {
      return new NextResponse('Translation job not found', { status: 404 });
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
    return new NextResponse('Server error', { status: 500 });
  }
}

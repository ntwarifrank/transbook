import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { getUserCredits } from '@/lib/database';

export async function GET(req) {
  try {
    const { userId } = auth(req);

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Fetch credits from the database
    const credits = await getUserCredits(userId);

    return NextResponse.json({ success: true, credits });

  } catch (error) {
    console.error('[CREDITS_GET] Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { addUserCredits } from '@/lib/database';

// This endpoint should be secured, ideally via a webhook secret from Paddle
// For now, it will rely on the user's session, but a webhook is recommended for production.

export async function POST(req) {
  try {
    const { userId } = auth(req);

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { amount } = await req.json();

    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return new NextResponse('Invalid credit amount.', { status: 400 });
    }

    // Add credits to the user's account in the database
    await addUserCredits(userId, amount);

    return NextResponse.json({ success: true, message: `${amount} credits added successfully.` });

  } catch (error) {
    console.error('[CREDITS_ADD] Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { deductUserCredits, getUserCredits } from '@/lib/database';

export async function POST(req) {
  try {
    const { userId } = auth(req);

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { amount } = await req.json();

    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return new NextResponse('Invalid deduction amount.', { status: 400 });
    }

    // Check if the user has enough credits before deducting
    const currentCredits = await getUserCredits(userId);
    if (currentCredits < amount) {
      return new NextResponse('Insufficient credits.', { status: 402 }); // 402 Payment Required
    }

    // Deduct credits from the database
    await deductUserCredits(userId, amount);

    const newCredits = await getUserCredits(userId);

    return NextResponse.json({ success: true, newBalance: newCredits });

  } catch (error) {
    console.error('[CREDITS_DEDUCT] Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

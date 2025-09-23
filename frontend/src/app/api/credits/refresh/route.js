import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { findOrCreateUser } from '@/lib/database';
import { MongoClient } from 'mongodb';

// This function updates the user's credits if a month has passed.
async function refreshFreeCredits(userId) {
  const client = await MongoClient.connect(process.env.MONGODB_URL);
  const db = client.db('transbookdb');
  const users = db.collection('users');

  const user = await findOrCreateUser(userId);

  // Only refresh for users on the free plan
  if (user.plan !== 'free') {
    await client.close();
    return { refreshed: false, message: 'User is on a paid plan.' };
  }

  const now = new Date();
  const lastRefresh = new Date(user.lastCreditRefresh);
  const oneMonth = 30 * 24 * 60 * 60 * 1000; // A simple 30-day month approximation

  if (now.getTime() - lastRefresh.getTime() >= oneMonth) {
    // A month has passed, so refresh the credits.
    await users.updateOne(
      { clerkId: userId },
      {
        $set: {
          credits: 5000, // Reset to the monthly free amount
          lastCreditRefresh: now,
        },
      }
    );
    await client.close();
    return { refreshed: true, newBalance: 5000 };
  } else {
    await client.close();
    return { refreshed: false, message: 'Not yet time for a monthly refresh.' };
  }
}

export async function POST(req) {
  try {
    const { userId } = auth(req);

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const result = await refreshFreeCredits(userId);

    return NextResponse.json({ success: true, ...result });

  } catch (error) {
    console.error('[CREDITS_REFRESH] Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

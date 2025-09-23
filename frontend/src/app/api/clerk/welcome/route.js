import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';

const FREE_CREDITS = 2000;

export async function POST(req) {
  try {
    const { userId } = await req.json();
    if (!userId) {
      return new NextResponse('User ID is required', { status: 400 });
    }

    // Check if the user already has credits
    const user = await clerkClient.users.getUser(userId);
    if (user.publicMetadata.credits) {
      return NextResponse.json({ success: true, message: 'User already has credits.' });
    }

    // Add free credits to the user's metadata
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        credits: FREE_CREDITS,
      },
    });

    return NextResponse.json({ success: true, credits: FREE_CREDITS });
  } catch (error) {
    console.error('Error adding free credits:', error);
    return new NextResponse('Failed to add free credits.', { status: 500 });
  }
}

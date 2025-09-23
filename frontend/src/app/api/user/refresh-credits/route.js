import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/clerk-sdk-node';

export async function POST(req) {
  try {
    const currentUserData = await currentUser();

    if (!currentUserData) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const userId = currentUserData.id;

    const { newCredits, refreshDate } = await req.json();

    // Update user metadata in Clerk
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        credits: newCredits,
        lastCreditRefresh: refreshDate,
        plan: 'free', // Ensure they stay on free plan
        creditRefreshHistory: {
          lastAmount: newCredits,
          lastDate: refreshDate
        }
      }
    });

    console.log(`✅ Credits refreshed for user ${userId}: ${newCredits} credits`);

    return NextResponse.json({ 
      success: true, 
      credits: newCredits,
      message: 'Monthly credits refreshed successfully'
    });

  } catch (error) {
    console.error('Error refreshing credits:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

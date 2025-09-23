import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';

export async function POST(req) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { userId: targetUserId, newCredits, refreshDate } = await req.json();
    
    // Verify the user is updating their own credits
    if (userId !== targetUserId) {
      return new NextResponse('Forbidden', { status: 403 });
    }

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

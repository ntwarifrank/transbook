import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/lib/models/User';

export async function GET(_req) {
  // Get the user ID from Clerk's authentication context
  const { userId } = auth();

  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    await dbConnect();

    // Find the user in the database using their Clerk ID
    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      return new NextResponse('User not found in database', { status: 404 });
    }

    // Return the user's profile data
    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        subscriptionPlan: user.subscriptionPlan,
        subscriptionStatus: user.subscriptionStatus,
        wordCredit: user.wordCredit,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('Get profile error:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}

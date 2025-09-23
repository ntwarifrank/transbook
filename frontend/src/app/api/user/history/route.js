import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/clerk-sdk-node';

export async function GET() {
  try {
    const currentUserData = await currentUser();
    if (!currentUserData) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    
    const userId = currentUserData.id;
    console.log('📚 Fetching translation history for user:', userId);
    
    // Get user metadata which might contain translation history
    const user = await clerkClient.users.getUser(userId);
    const translationHistory = user.publicMetadata.translationHistory || [];
    
    // Sort by date (newest first)
    const sortedHistory = translationHistory.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    return NextResponse.json({
      success: true,
      translations: sortedHistory,
      count: sortedHistory.length
    });
    
  } catch (error) {
    console.error('Error fetching translation history:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch translation history',
      details: error.message
    }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const currentUserData = await currentUser();
    if (!currentUserData) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    
    const userId = currentUserData.id;
    const { translationData } = await req.json();
    
    console.log('💾 Saving translation to server history:', translationData);
    
    // Get current user metadata
    const user = await clerkClient.users.getUser(userId);
    const currentHistory = user.publicMetadata.translationHistory || [];
    
    // Create new translation entry
    const newTranslation = {
      id: translationData.translationId || Date.now().toString(),
      fileName: translationData.fileName,
      originalLanguage: translationData.originalLanguage || 'auto',
      targetLanguage: translationData.targetLanguage,
      status: translationData.status || 'completed',
      createdAt: new Date().toISOString(),
      fileSize: translationData.fileSize,
      wordCount: translationData.wordCount,
      translationId: translationData.translationId
    };
    
    // Add to beginning of array (newest first)
    const updatedHistory = [newTranslation, ...currentHistory];
    
    // Keep only last 100 translations
    const limitedHistory = updatedHistory.slice(0, 100);
    
    // Update user metadata
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        ...user.publicMetadata,
        translationHistory: limitedHistory
      }
    });
    
    return NextResponse.json({
      success: true,
      message: 'Translation saved to history',
      translation: newTranslation
    });
    
  } catch (error) {
    console.error('Error saving translation to history:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to save translation to history',
      details: error.message
    }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const currentUserData = await currentUser();
    if (!currentUserData) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    
    const userId = currentUserData.id;
    const url = new URL(req.url);
    const translationId = url.searchParams.get('translationId');
    const clearAll = url.searchParams.get('clearAll') === 'true';
    
    console.log('🗑️ Deleting from server history:', { translationId, clearAll });
    
    // Get current user metadata
    const user = await clerkClient.users.getUser(userId);
    let updatedHistory = user.publicMetadata.translationHistory || [];
    
    if (clearAll) {
      updatedHistory = [];
    } else if (translationId) {
      updatedHistory = updatedHistory.filter(t => t.id !== translationId);
    }
    
    // Update user metadata
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        ...user.publicMetadata,
        translationHistory: updatedHistory
      }
    });
    
    return NextResponse.json({
      success: true,
      message: clearAll ? 'All translations cleared' : 'Translation deleted',
      remainingCount: updatedHistory.length
    });
    
  } catch (error) {
    console.error('Error deleting from translation history:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to delete from translation history',
      details: error.message
    }, { status: 500 });
  }
}

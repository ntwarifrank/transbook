// Utility function to save translation to history
export const saveToHistory = (user, translationData) => {
  if (!user) return;
  
  try {
    const currentHistory = JSON.parse(localStorage.getItem(`translations_${user.id}`) || '[]');
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
    
    // Keep only last 50 translations
    const limitedHistory = updatedHistory.slice(0, 50);
    
    localStorage.setItem(`translations_${user.id}`, JSON.stringify(limitedHistory));
    console.log('✅ Translation saved to history:', newTranslation);
  } catch (error) {
    console.error('Error saving translation to history:', error);
  }
};

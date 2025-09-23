import { NextResponse } from 'next/server';
import { extractTextFromFile } from '@/lib/translation';

export async function POST(req) {

  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return new NextResponse('No file uploaded', { status: 400 });
    }

    // Limit file size (e.g., 50MB)
    if (file.size > 50 * 1024 * 1024) {
        return new NextResponse('File size exceeds 50MB', { status: 413 });
    }

    console.log(`Processing upload: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)}MB)`);

    // Efficiently read the file into a buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Pass the buffer and file name to the extraction function
    const extractedContent = await extractTextFromFile(buffer, file.name);
    const documentId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

    // In a real application, you would save the document metadata to a database here
    // with the documentId as the primary key.

    return NextResponse.json({
      success: true,
      message: 'Document processed successfully',
      extractedContent,
      documentId,
    });

  } catch (error) {
    console.error('Upload error:', error);
    return new NextResponse(error.message || 'Internal server error', {
      status: 500,
    });
  }
}

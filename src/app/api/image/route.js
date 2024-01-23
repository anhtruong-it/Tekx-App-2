import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');


  try {
    const formData = await request.formData();

    // Access the file and additional data from the FormData object
    const file = formData.get('file');
    const projectId = formData.get('projectId');
    console.log("projectId: ", projectId);

    // App Router Route Handlers
    const blob = await put(filename, file, {
      access: 'public',
    });

    console.log("body: ", [blob.url, blob.pathname, projectId]);

    return NextResponse.json(blob);
  } catch (error) {
    console.error('Error reading FormData:', error);
    return NextResponse.json({ error: 'Error reading FormData' }, { status: 500 });
  }
}

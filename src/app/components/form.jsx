'use client';
import { put } from '@vercel/blob';
import { revalidate } from 'next/cache'; // Import `revalidate` instead of `revalidatePath`
import { useState } from 'react'; // Import `useState`

export default function Form() {
  const [blob, setBlob] = useState(null);

  async function handleFormSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const imageFile = formData.get('image');

    if (imageFile instanceof File)
    {} else {
    console.error('No file selected');
    }


    try {
        
      const {url} = await put(imageFile.name, imageFile, {
        access: 'public',
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });

      setBlob(url);
      revalidate('/'); // Use `revalidate` instead of `revalidatePath`
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <label htmlFor="image">Image</label>
      <input type="file" id="image" name="image" required />
      <button type="submit">Upload</button>
      {blob && (
        <div>
          Blob url: <a href={blob.url}>{blob.url}</a>
        </div>
      )}
    </form>
  );
}

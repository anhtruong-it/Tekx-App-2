'use client';
import LoadingButton from '@/components/loadingButton';
import { useState, useRef } from 'react';

export default function UploadForm() {
  const inputFileRef = useRef(null);
  const [blob, setBlob] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (event) => {
    event.preventDefault();

    const file = inputFileRef.current.files[0];

    try {
      // Set uploading state to true
      setUploading(true);

      const response = await fetch(`/api/image?filename=${file.name}`, {
        method: 'POST',
        body: file,
      });

      const newBlob = await response.json();
      console.log(newBlob);

      // Set the new blob in the state
      setBlob(newBlob);
    } finally {
      // Reset uploading state to false
      setUploading(false);
      
    }
  };

  return (
    <>
      <h1>Upload Your Avatar</h1>

      {uploading ? (
        <LoadingButton variant="blue" text="Uploading..." />
      ) : (
        <form onSubmit={handleUpload}>
          <input name="file" ref={inputFileRef} type="file" required />
          <button type="submit">Upload</button>
        </form>
      )}

      {/* {blob && (
        // Test URL uploaded image
        <div>
          Blob url: <a href={blob.url}>{blob.url}</a>
        </div>
      )} */}
    </>
  );
}

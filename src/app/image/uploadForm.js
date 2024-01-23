'use client';
import LoadingButton from '@/components/loadingButton';
import { useState, useRef } from 'react';

export default function UploadForm() {
  const inputFileRef = useRef(null);
  const [blob, setBlob] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [projectId, setProjectId] = useState('');

  const handleUpload = async (event) => {
    event.preventDefault();

    const file = inputFileRef.current.files[0];
    

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('projectId', projectId);


      const response = await fetch(`/api/image?filename=${file.name}`, {
        method: 'POST',
        body: formData,
      });

      const newBlob = await response.json();
      
      setBlob(newBlob);
      console.log(newBlob);
      
    } finally {
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
          <input name='projectId' type='number' placeholder='Enter Project ID' value={projectId} onChange={(e) => setProjectId(e.target.value)} required
          className="border border-gray-300 rounded-md p-2 text-black"/>
          <input name="file" ref={inputFileRef} type="file" accept='image/*' required />
          <button type="submit">Upload</button>
        </form>
      )}
    </>
  );
}

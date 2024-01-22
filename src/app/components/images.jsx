import { list } from '@vercel/blob';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Images() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchImages() {
      try {
        const blobs = await list({token: process.env.BLOB_READ_WRITE_TOKEN,});
        setImages(blobs);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    }

    fetchImages();
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <section>
      {images.map((image) => (
        <Image
          priority
          key={image.pathname}
          src={image.url}
          alt="Image"
          width={200}
          height={200}
        />
      ))}
    </section>
  );
}

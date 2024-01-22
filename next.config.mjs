/** @type {import('next').NextConfig} */
const nextConfig = {
    /** @type {import('next').NextConfig} */
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'my-blob-store.public.blob.vercel-storage.com',
                port: '',
            },
        ],
    },
};

export default nextConfig;

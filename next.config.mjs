/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    cacheComponents: true
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.cloudinary.com' }
    ]
  }
};

export default nextConfig;



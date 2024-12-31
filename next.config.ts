export default {
  reactStrictMode: true,
  experimental: { appDir: true },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**'
      }
    ]
  }
};

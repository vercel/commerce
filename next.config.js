/** @type {import('next').NextConfig} */
module.exports = {
  eslint: {
    // Disabling on production builds because we're running checks on PRs via GitHub Actions.
    ignoreDuringBuilds: true
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { hostname: "picsum.photos" },
      { hostname: "storage.googleapis.com" },
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/s/files/**"
      },
      {
        hostname: "**.cf3.rackcdn.com",
        protocol: "https",
        port: "",
        pathname: "/*"
      }
    ]
  },
  async redirects() {
    return [
      {
        source: "/password",
        destination: "/",
        permanent: true
      }
    ];
  }
};

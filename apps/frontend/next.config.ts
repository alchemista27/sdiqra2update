import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.INTERNAL_API_URL || 'http://127.0.0.1:5000/api/:path*',
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/ppdb',
        destination: 'https://ppdbalfida.vercel.app',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

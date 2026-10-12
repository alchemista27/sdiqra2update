import type { NextConfig } from "next";

const rawInternalApi = process.env.INTERNAL_API_URL || 'http://127.0.0.1:5000';
// Strip trailing /api and trailing slash so destination path wildcard is preserved cleanly
const cleanInternalBase = rawInternalApi.replace(/\/api\/?$/, '').replace(/\/+$/, '');

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
  },
  allowedDevOrigins: [
    '187.127.113.61',
    '187.127.113.61:3000',
    'localhost:3000',
    '127.0.0.1:3000',
  ],
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${cleanInternalBase}/api/:path*`,
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

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
  },
  async rewrites() {
    return process.env.NODE_ENV === 'development' ? [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*',
      },
    ] : [];
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

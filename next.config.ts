import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  compress: true,
  reactStrictMode: true,
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ilocator.s3.amazonaws.com',
        port: '',
        pathname: '/**', // Allows any path under this hostname
      },
    ],
  },
};

export default nextConfig;

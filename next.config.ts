import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  trailingSlash: false,
  devIndicators: false,
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' },
    ],
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react', 'recharts'],
  },
};

export default nextConfig;

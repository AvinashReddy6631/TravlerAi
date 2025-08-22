import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fix workspace root warning
  outputFileTracingRoot: __dirname,
  
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['react-leaflet', 'leaflet']
  },
  
  // Image optimization for external images
  images: {
    domains: [
      'images.unsplash.com',
      'ui-avatars.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        port: '',
        pathname: '/**',
      }
    ]
  },
  
  // TypeScript configuration
  typescript: {
    // Don't fail build on type errors during development
    ignoreBuildErrors: false,
  },
  
  // ESLint configuration
  eslint: {
    // Don't fail build on lint errors during development
    ignoreDuringBuilds: false,
  }
};

export default nextConfig;

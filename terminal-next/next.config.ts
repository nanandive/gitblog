import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React Strict Mode for better error detection during development
  reactStrictMode: true,

  // Remove X-Powered-By header for security
  poweredByHeader: false,

  // Mark server-only packages — prevents fs/path being bundled into client
  serverExternalPackages: ['gray-matter', 'fs', 'path'],

  // Image optimization settings
  images: {
    formats: ['image/avif', 'image/webp'],
  },


  // Configure headers for better security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;

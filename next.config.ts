
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'dl.dropboxusercontent.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  experimental: {
  },
  allowedDevOrigins: [
    "https://6000-firebase-studio-1753240519809.cluster-lu4mup47g5gm4rtyvhzpwbfadi.cloudworkstations.dev",
    "https://9000-firebase-studio-1753240519809.cluster-lu4mup47g5gm4rtyvhzpwbfadi.cloudworkstations.dev",
  ],
  webpack: (
    config,
    { isServer }
  ) => {
    if (!isServer) {
        config.externals.push('async_hooks');
    }

    return config;
  },
};

export default nextConfig;

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
    ],
  },
  experimental: {
  },
  allowedDevOrigins: [
    "https://6000-firebase-studio-1753240519809.cluster-lu4mup47g5gm4rtyvhzpwbfadi.cloudworkstations.dev",
    "https://9000-firebase-studio-1753240519809.cluster-lu4mup47g5gm4rtyvhzpwbfadi.cloudworkstations.dev",
  ]
};

export default nextConfig;

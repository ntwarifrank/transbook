/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // This is the key change: it prevents pdf-parse from being bundled on the server
    // which was causing the file system error.
    if (isServer) {
      config.externals = [...config.externals, 'pdf-parse'];
    }

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'framerusercontent.com',
        port: '',
        pathname: '**',
      },
    ],
  },
  serverExternalPackages: ['pdf-parse'],
};

export default nextConfig;

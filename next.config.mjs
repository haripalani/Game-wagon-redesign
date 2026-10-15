/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'prod-gw-assets.s3.ap-south-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'gamewagon.in',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;

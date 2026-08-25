/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mskschoolmaroc.com',
      },
      {
        protocol: 'https',
        hostname: 'embed-ssl.wistia.com',
      },
      {
        protocol: 'https',
        hostname: 'fast.wistia.com',
      },
    ],
  },
};

export default nextConfig;

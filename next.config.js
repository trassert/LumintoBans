/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/bans', 
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'minotar.net',
      }
    ]
  }
};
module.exports = nextConfig;

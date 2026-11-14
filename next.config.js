/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/sponsors',
        destination: '/initiatives',
        permanent: false,
      },
      {
        source: '/collaborations',
        destination: '/contact',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;

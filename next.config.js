/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'via.placeholder.com'],
    unoptimized: true
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    POSTGRES_URL: process.env.POSTGRES_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    WEATHER_API_KEY: process.env.WEATHER_API_KEY,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/api/:path*',
      },
      {
        source: '/api/placeholder/:path*',
        destination: 'https://via.placeholder.com/:path*',
      },
    ];
  },
}

module.exports = nextConfig

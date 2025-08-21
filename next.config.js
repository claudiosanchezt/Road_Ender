/** @type {import('next').NextConfig} */
const nextConfig = {
  // Produce standalone output for Docker production image
  output: 'standalone',
  images: {
    domains: ['localhost', 'via.placeholder.com'],
    unoptimized: true
  },
  env: {
  MONGODB_URI: process.env.MONGODB_URI,
  POSTGRES_URL: process.env.POSTGRES_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  WEATHER_API_KEY: process.env.WEATHER_API_KEY,
  // NEXT_PUBLIC_API_URL puede sobreescribirse en entorno o en .env.local
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL ?? (process.env.NODE_ENV === 'production' ? 'http://localhost:4000' : 'http://localhost:3000')
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    // Por seguridad no proxye '/api' por defecto: esto permite que las app-routes
    // internas de Next permanezcan accesibles. Active el proxy solo si se
    // exporta ENABLE_API_PROXY=true en el entorno (ej: despliegues especiales).
    const proxyEnabled = process.env.ENABLE_API_PROXY === 'true';
    const proxyTarget = process.env.NEXT_PUBLIC_API_URL ?? (process.env.NODE_ENV === 'production' ? 'http://localhost:4000' : 'http://localhost:3000');

    const rewrites = [];

    if (proxyEnabled) {
      rewrites.push({
        source: '/api/:path*',
        destination: `${proxyTarget}/api/:path*`,
      });
    }

    // Placeholder image proxy (siempre disponible)
    rewrites.push({ source: '/api/placeholder/:path*', destination: 'https://via.placeholder.com/:path*' });

    return rewrites;
  },
}

module.exports = nextConfig

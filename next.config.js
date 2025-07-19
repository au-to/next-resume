/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
  images: {
    domains: ['avatars.githubusercontent.com', 'github.com'],
  },
  env: {
    NEXTAUTH_URL: process.env.AUTH_URL,
    NEXTAUTH_SECRET: process.env.AUTH_SECRET,
  },
}

module.exports = nextConfig 
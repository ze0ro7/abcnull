/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    allowedDevOrigins: ["https://3000-firebase-abcnull-1760260558356.cluster-edb2jv34dnhjisxuq5m7l37ccy.cloudworkstations.dev"],
  }
}

export default nextConfig

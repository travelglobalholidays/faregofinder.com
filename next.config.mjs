/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NEXT_BUILD_DIR || ".next",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

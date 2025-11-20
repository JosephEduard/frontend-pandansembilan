/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Allow Unsplash remote images used in the hero carousel
    domains: ["images.unsplash.com"],
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "live.staticflickr.com",
        protocol: "https",
      },
    ],
  },
};

module.exports = nextConfig;

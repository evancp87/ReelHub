/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["reelhub.s3.eu-west-2.amazonaws.com", "res.cloudinary.com"],
  },
};

module.exports = nextConfig;

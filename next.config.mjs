/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "rapid-sardine-332.convex.cloud"
      }
    ],
  }
};

export default nextConfig;

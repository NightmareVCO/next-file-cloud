/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "rapid-sardine-332.convex.cloud"
      },
      {
        hostname: "charming-ocelot-993.convex.cloud"
      }
    ],
  }
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow next/image to optimise images served from placehold.co (the
  // current placeholder source for the avatar and project dashboards).
  // Production should swap these for assets in /public or a CDN.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
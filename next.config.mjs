import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: false,
  register: true,
  scope: "/app",
  sw: "service-worker.js",
  //...
});

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.licdn.com",
      },
      {
        protocol: "https",
        hostname: "image.pollinations.ai",
      },
    ],
  },
};

// Combine withPWA with nextConfig
export default withPWA(nextConfig);

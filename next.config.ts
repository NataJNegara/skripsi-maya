import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: `${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.${process.env.NEXT_PUBLIC_AWS_ENDPOINT_URL_S3}`,
        port: "",
      },
    ],
  },
  //
  experimental: {
    useCache: true,
  },
};

export default nextConfig;

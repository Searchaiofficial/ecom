const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wowslider.com",
      },
      {
        protocol: "https",
        hostname: "static.thenounproject.com",
      },
      {
        protocol: "https",
        hostname: "t4.ftcdn.net",
      },
      {
        protocol: "https",
        hostname: "www.google.com",
      },
      {
        protocol: "https",
        hostname: "ayatrio-bucket.s3.ap-south-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "i0.wp.com",
      },
      {
        protocol: "https",
        hostname: "cdn.britannica.com",
      },
      {
        protocol: "https",
        hostname: "example.com",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
      {
        protocol: "https",
        hostname: "cdn1.vectorstock.com",
      },
      {
        protocol: "https",
        hostname: "www.iconpacks.net",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "in.pinterest.com",
      },
      {
        protocol: "https",
        hostname: "ayatrio-images.s3.ap-south-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "localhost:5173",
      },
      {
        protocol: "https",
        hostname: "www.ikea.com",
      },
      {
        protocol: "http",
        hostname: "localhost:3000",
      },
      {
        protocol: "https",
        hostname: "wellgroomedgentleman.com",
      },
      {
        protocol: "https",
        hostname: "scontent.cdninstagram.com",
      },
      {
        protocol: "https",
        hostname: "scontent-sin6-3.cdninstagram.com",
      },
      {
        protocol: "https",
        hostname: "**.cdninstagram.com",
      },
      {
        protocol: "https",
        hostname: "unsplash.com",
      },
      {
        protocol: "https",
        hostname: "ecom-data3.s3.ap-south-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "scontent.cdninstagram.com",
      },
      {
        protocol: "https",
        hostname: "scontent-del1-2.cdninstagram.com",
      },
      {
        protocol: "https",
        hostname: "scontent-del2-1.cdninstagram.com",
      },
      {
        protocol: "https",
        hostname: "scontent-del1-1.cdninstagram.com",
      },
      {
        protocol: "https",
        hostname: "bolt-gcdn.sc-cdn.net",
      },
    ],
    // domains: ["images.unsplash.com"],
  },
  distDir: "build",
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

module.exports = withBundleAnalyzer(nextConfig);

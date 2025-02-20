const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  compiler: {
    reactRemoveProperties: true,
  },
  devIndicators: {
    buildActivity: false,
    buildActivityPosition: "bottom-right",
  },
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client"],
  },
};

module.exports = nextConfig;

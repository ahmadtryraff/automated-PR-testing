/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  transpilePackages: ["@cometchat/chat-uikit-react", "@cometchat-pro/chat"],
  staticPageGenerationTimeout: 120, 
  async redirects() {
    return [
      {
        source: '/settings',
        destination: '/settings/general-settings',
        permanent: true,
      },
    ];
  },

  webpack: (config) => {
    // svgr
    config.module.rules.push({
      test: /\.svg$/i,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            icon: true,
            dimensions: false,
            // removeAttributes: {}
          },
        },
      ],
    });

    return config;
  },
  images: {
    unoptimized: true,
  }
};

export default nextConfig;
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure public assets are served correctly with i18n
  // Configure image domains if needed
  images: {
    domains: ['localhost'],
    unoptimized: true,
  }
};

module.exports = withNextIntl(nextConfig); 
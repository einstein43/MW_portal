/** @type {import('next').NextConfig} */

const nextConfig = {
  /* config options here */
  
  // Disable Turbopack as it's causing conflicts with webpack config
  turbo: {
    // Disable turbopack completely for now
    loaders: {}
  },
  
  // Enhanced configuration for Docker hot reloading
  webpack: (config, { isServer }) => {
    // Enable aggressive file system polling for Docker environment
    config.watchOptions = {
      poll: 800, // Check for changes every 800ms
      aggregateTimeout: 300, // Delay rebuild for 300ms after file change detected
      ignored: /node_modules/, // Don't watch node_modules
    };
    return config;
  },
  
  // Ensure server watches for file changes
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 800,
      aggregateTimeout: 300,
    };
    return config;
  },
};

module.exports = nextConfig;
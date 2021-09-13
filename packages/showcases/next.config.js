module.exports = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve.fallback = {
        canvas: false
      }
    }

    return config;
  }
}
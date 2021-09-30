const baseUrl = ''

module.exports = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: true,
  basePath: baseUrl,
  env: {
    baseUrl: baseUrl
  },
  webpack5: true,
  target: 'serverless',
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve.fallback = {
        canvas: false
      }
    }

    return config;
  }
}
var webpack = require('webpack')

module.exports = {
  reactStrictMode: true,
  webpack(config, options) {
    config.plugins.push(
      new webpack.IgnorePlugin(/canvas|jsdom/)
    )
    return config
  },
}
const withCSS = require('@zeit/next-css')
const withPlugins = require('next-compose-plugins')
const optimizedImages = require('next-optimized-images')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const CompressionPlugin = require('compression-webpack-plugin')

const nextConfig = {
  webpack(config) {
    const prod = process.env.NODE_ENV === 'production'
    const plugins = [...config.plugins]
    prod && plugins.push(new CompressionPlugin())
    return {
      ...config,
      mode: prod ? 'production' : 'development',
      devtool: prod ? 'hidden-source-map' : 'eval',
      module: {
        ...config.module,
      },
      output: {
        ...config.output,
      },
      plugins,
    }
  },
}

module.exports = withPlugins(
  [
    [
      optimizedImages,
      {
        handleImages: ['png'],
      },
    ],
    [withCSS, { cssModules: true }],
    withBundleAnalyzer,
  ],
  nextConfig,
)

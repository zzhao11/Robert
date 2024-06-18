const { defineConfig } = require('@vue/cli-service')
const  path  = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
    devServer: {
        proxy: {
          '/api': {
            target: 'http://150.158.48.194:8088/',
            pathRewrite: { "^/api": "" },
            changeOrigin: true,
          }
        }
      },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './src/assets/css/globalVars.less')
      ]
    }
  }
})

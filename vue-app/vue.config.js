const { defineConfig } = require('@vue/cli-service')
const { name } = require('./package');
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'development' ? '/' : '/qiankun-demo/child/vue-history/',
  devServer: {
    port: 8080, // 设置端口为 8080
    open: false, // 可选：自动打开浏览器
    hot: true,  // 可选：启用热更新
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  configureWebpack: {
    output: {
      library: `${name}-[name]`,
      libraryTarget: 'umd', // 把微应用打包成 umd 库格式
      chunkLoadingGlobal: `chunkLoadingGlobal_${name}`, 
      // jsonpFunction: `webpackJsonp_${name}`, // webpack 5 需要把 jsonpFunction 替换成 chunkLoadingGlobal
    },
    resolveLoader: {
    },
  },
  // css: {
  //   loaderOptions: {
  //     scss: {
  //       additionalData: `@import "~@/styles/variables.scss";` // 全局引入 SCSS 变量文件（可选）
  //     }
  //   }
  // }
})
// my-style-loader.js 如果开启shadowDOM支持，需在vue.config.js中配置
const myStyleLoader = function (source) {
  return source.replace(/:root/g, ':host')
}
module.exports = myStyleLoader

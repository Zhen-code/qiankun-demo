// my-style-loader.js
const myStyleLoader = function (source) {
  return source.replace(/:root/g, ':host')
}
module.exports = myStyleLoader

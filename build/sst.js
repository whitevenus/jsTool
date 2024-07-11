// 联调环境
'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod')
console.log(process.env['F6_RUN_ENV'])

module.exports = merge(prodEnv, {
  // TIP 无法自动生成的可以自定义覆盖
})

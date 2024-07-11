'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod')

module.exports = merge(prodEnv, {
  // TIP 无法自动生成的可以自定义覆盖
})

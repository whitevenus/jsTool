const WebpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const path = require('path')

const { F6_RUN_ENV, VUE_APP_ANALYZE, NODE_ENV, DEV_TEST_ENV } = process.env

const isAnalyze = VUE_APP_ANALYZE === '1'
console.log(F6_RUN_ENV || 'dev')
const CONSTANTS = F6_RUN_ENV === 'dev' ? require('./build/dev.js')(DEV_TEST_ENV) : require(`./build/${F6_RUN_ENV || 'dev'}.js`)

// const CONSTANTS = require(`./build/${runEnv}.js`)
const commonOptions = {
  FUNDEBUG_API_KEY: '', // TIP 填入分配的 fundebugApiKey
  devPort: 8088,
  DEBUG_TAG: ['dev', 'test', 'sst', 'sit', 'pre'].includes(F6_RUN_ENV),
  F6_RUN_ENV, // TIP 当前运行环境，不是本地调试的环境，本地调试时 F6_RUN_ENV=dev DEV_TEST_ENV 才是调试环境对应的值
  DEV_TEST_ENV // TIP 当前
}
module.exports = {
  productionSourceMap: F6_RUN_ENV === 'dev',
  publicPath: NODE_ENV === 'production' ? CONSTANTS.urlBase : '/',
  devServer: {
    host: 'yunxiu-dev.f6car.org', // TIP 记得添加配置 hosts: "127.0.0.1       m-dev.f6car.org"
    port: commonOptions.devPort, // TIP 开发端口号 可以修改
    disableHostCheck: true,
    overlay: {
      warnings: false,
      errors: true
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  css: {
    extract: NODE_ENV === 'production',
    requireModuleExtension: true,
    loaderOptions: {
      css: {
        sourceMap: false,
        modules: {
          localIdentName: '[name]_[local]__[hash:base64:6]'
        },
        localsConvention: 'camelCaseOnly'
      }
    }
  },
  chainWebpack: config => {
    function addStyleResource (rule) {
      rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
          patterns: [
            path.resolve(__dirname, './src/style/_variable.styl')
          ]
        })
    }

    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('stylus').oneOf(type)))

    config
      .plugin('define')
      .tap(args => {
        const CFG_OPT = {
          ...commonOptions,
          ...CONSTANTS
        }
        Object.keys(CFG_OPT).forEach(value => {
          CFG_OPT[`${value}`.toUpperCase()] = CFG_OPT[value]
        })
        // 处理 其他公共变量
        const CFG = {
          CFG_DEBUG_TAG: commonOptions.DEBUG_TAG,
          CFG_APP_NAME: commonOptions.appName,
          CFG_FUNDEBUG_API_KEY: commonOptions.fundebugApiKey,
          CFG_F6_RUN_ENV: commonOptions.F6_RUN_ENV,
          CFG_WEB_APP_VERSION: commonOptions.WEB_APP_VERSION,
          ...CFG_OPT
        }
        console.log(CFG)
        Object.keys(CFG).forEach(value => {
          CFG[value] = JSON.stringify(CFG[value])
        })
        // 合并
        // Object.assign(args[0], CFG)
        args[0].CFG = CFG
        // console.log(CFG)
        return args
      })
    config.module
      .rule('js')
      .test(/\.js$/)
      .use('babel-loader')
      .loader('babel-loader')
      .end()
    if (isAnalyze) {
      config
        .plugin('bundle-analyzer')
        .use(WebpackBundleAnalyzer)
    }
    const packageName = 'cayenne-order'
    config.output.set('library', `${packageName}-[name]`)
    config.output.set('libraryTarget', 'umd')
    config.output.set('jsonpFunction', `webpackJsonp_${packageName}`)
    config.plugin('html').tap(args => {
      args[0].minify = false
      return args
    })
  },
  configureWebpack: {
    optimization: {
      splitChunks: {
        cacheGroups: {
          theme: {
            name: 'chunk-theme',
            test: /[\\/]node_modules\/@f6\/aviator-ui[\\/]/,
            chunks: 'all',
            priority: 1,
            reuseExistingChunk: true,
            enforce: true
          }
        }
      }
    }
  },
  lintOnSave: true
}

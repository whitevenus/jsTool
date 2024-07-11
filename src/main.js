import Vue from 'vue'
import App from './App.vue'
import { getNewRouter } from './router'
import store from './store'
import L from '@f6/lube'
import Sensors from '@f6/sensors'
// TIP 请在 plugins文件中注册对应的组件
import { initPlugins } from '@/plugins'

Vue.config.productionTip = false
// 配置从 CFG 对象中获取
// TIP 初始化lube，请修改systemName
L.initLube({
  systemName: 'f6-base-qiankun-child',
  runEnv: CFG.F6_RUN_ENV === 'dev' ? CFG.DEV_TEST_ENV : CFG.F6_RUN_ENV, // 运行环境
  platform: 'PC'
})
// TIP 神策埋点和fundebug相关配置，参考文档 https://xcz.yuque.com/shswyy/rwnthv/rkn5zu
const sensorsConfig = Sensors.SensorsConfig.init(L)
sensorsConfig.configSensors()
sensorsConfig.configFundebug(CFG.FUNDEBUG_API_KEY)
Vue.use(Sensors, sensorsConfig)

// TIP 全局的漏斗埋点，参考文档 https://xcz.yuque.com/shswyy/rwnthv/ff5cbx
// import { Flow } from '@f6/sensors'
// const flow = new Flow('f6-base-qiankun-child', L)
// Vue.prototype.$flow = flow

initPlugins()

let instance
let router

const render = () => {
  router = getNewRouter()
  instance = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}

export async function bootstrap () {
}

export async function mount (props) {
  const { bridge, setup } = props
  // TIP 从主应用
  setup(({ commonLib, uiFramework }) => {
    Vue.prototype.$message = commonLib.$message
    Vue.use(uiFramework)
  })
  render()
  Vue.api = bridge.api
  // TIP 一些 api 示例
  // const { centralRouter, getPermissions, hasPermission, getUser, logout, changePageKey, clearPageKey } = bridge.api
}

export async function unmount () {
  instance.$destroy()
  instance = null
}

if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

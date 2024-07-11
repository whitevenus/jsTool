import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import { FirstScreenRecord, notifyError, WhiteScreenRecord } from '@f6/sensors'

// TIP 注意不要在 路由器（router） 配置文件中定义 路由（route）

Vue.use(VueRouter)

export const getNewRouter = () => {
  const router = new VueRouter({
    routes
  })

  // TIP 路由钩子在此注册
  let initialized
  router.beforeEach((to, from, next) => {
    if (Vue.api.hasPermission(to.meta.permission || '*')) {
      next()
    } else {
      Vue.prototype.$alert('没有该页面的访问权限')
    }
  })
  router.afterEach((to, from) => {
    if (!initialized) {
      try {
        FirstScreenRecord.endRecord()
      } catch (e) {
        notifyError('performanceCollectionError', e)
      } finally {
        initialized = true
      }
    }
    try {
      to.query.whiteScreenRecord = WhiteScreenRecord.startRecord({
        $url: `${window.location.href.split('#')[0]}#${to.fullPath}`,
        $title: to.meta.title || 'ERROR: Meta no title!',
        webAppVersion: CFG.CFG_WEB_APP_VERSION,
        pageKey: to.meta.pageKey
      })
    } catch (e) {
      to.query.whiteScreenRecord = {
        endRecord: () => {
        },
        errorTag: true
      }
    }
  })
  return router
}

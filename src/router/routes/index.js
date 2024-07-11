import { RouteTree } from '@f6/lube'
import Home from '@/views/Home'

// TIP 树形结构的路由定义
const routes = RouteTree.of('主模块', [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { pageKey: '首页' }
  }
])
  .child([
    RouteTree.of('关于', [
      {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ '@/views/About.vue'),
        meta: { pageKey: '' }
      }
    ])
  ])
  .getRoute()

export default routes

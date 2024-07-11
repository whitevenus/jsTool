import { allComponents } from '@/components'

// TIP 全局自定义组件公共放在这里处理

export const initComponent = (Vue) => {
  // 统一安装公共组件
  allComponents.forEach(item => {
    Vue.component(item.name, item)
  })
}

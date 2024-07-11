import { initComponent } from './component'
import { initFilter } from './filter'
import { initDirective } from './directive'
import { initUIFramework } from '@/plugins/ui'

export const initPlugins = (Vue) => {
  initUIFramework(Vue)
  initComponent(Vue)
  initFilter()
  initDirective()
}

'use strict'
const { getHQDomain, getSOssDomain } = require('@f6/gaia')
const { name } = require('../package.json')

/**
 * TIP 关于动态域名
 * prod 生成的域名会根据 F6_RUN_ENV 的不同自动改变（除了「本地」也就是 dev 环境外）
 * 符合 m.f6car.com/yunxiu.f6car.com 规范的域名可以直接自动生成，在其他环境的配置文件中不需要特殊处理，继承 prod 即可
 * 不符合规范的 例如 ids-goods.f6car.com/data-backend.f6car.com 等等，需要自行配置对应的环境的配置
 * @type {string}
 */
const projectPath = name.replace(/[-]/g, '')
const env = process.env['F6_RUN_ENV']

const commonConfig = {
  // 例子中这个无法完全动态，需要在其他环境配置文件中进行自定义（由于 trail 环境的值为 prodTrialOrg，其他环境符合 `${env}Org` 的规则）
  ORG_COOKIE_NAME: `${env}Org`,
  ERP_ADDRESS: `//${getHQDomain()}/kzf6`,
  TASK_ADDRESS: `//${getHQDomain()}/task`,
  GOODS_SERVER_ADDRESS: `//${getHQDomain()}/ghost`,
  GOODS_DUMP_ADDRESS: `//${getHQDomain()}/goods-dump`,
  DATA_BACKEND_SERVER_ADDRESS: `//${getHQDomain()}/f6-data-backend`,
  CAYENNE_SERVER_ADDRESS: `//${getHQDomain()}/cayenne`,
  PATRIOT_SERVER_ADDRESS: `//${getHQDomain()}/patriot`,
  assetsPublicPath: `//${getSOssDomain()}/${projectPath}/${env}/`
}
module.exports = commonConfig

'use strict'
const merge = require('webpack-merge')

module.exports = (localEnv) => ({
  ORG_COOKIE_NAME: `${localEnv}Org`,
  SERVER_ADDRESS: `//m-${localEnv}.f6car.org/f6-crm`,
  ERP_ADDRESS: `//yunxiu-${localEnv}.f6car.org/kzf6`,
  HIVE_SERVER_ADDRESS: `//yunxiu-${localEnv}.f6car.org/hive`,
  GOODS_SERVER_ADDRESS: `//ids-goods-${localEnv}.f6car.org/f6-ids-goods`,
  PATRIOT_SERVER_ADDRESS: `//yunxiu-${localEnv}.f6car.org/patriot`,
  CAYENNE_ADDRESS: `//yunxiu-${localEnv}.f6car.org/cayenne`,
  CAYENNE_VIEW_ADDRESS: `//yunxiu-${localEnv}.f6car.org/cayenne/view/index.html#/`,
  MEMBER_SERVER_ADDRESS: `//yunxiu-${localEnv}.f6car.org/member`,
  MAINTAIN_SERVER_ADDRESS: `//yunxiu-${localEnv}.f6car.org/maintain`,
  CAYENNE_SERVER_ADDRESS: `//yunxiu-${localEnv}.f6car.org/cayenne`
})

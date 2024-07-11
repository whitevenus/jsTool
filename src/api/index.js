import Ajax from '@/plugins/network'

// TIP 接口分模块汇总在这个文件夹
// 如果接口不多也可以如以下例子，直接写在这里
export const getGhostDataById = (id) => Ajax.get('', { params: { id } })
export const queryGhostData = params => Ajax.post('', params)

// TIP 请求取消异常
export default class RequestCancelError extends Error {}
RequestCancelError.prototype.name = 'RequestCancelError'

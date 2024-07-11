// TIP 网络连接超时
export default class NetworkTimeoutError extends Error {}
NetworkTimeoutError.prototype.name = 'NetworkTimeoutError'

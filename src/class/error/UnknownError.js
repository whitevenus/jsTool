// TIP 无法识别的异常
export default class UnknownError extends Error {}
UnknownError.prototype.name = 'UnknownError'

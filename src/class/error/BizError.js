// TIP 业务异常
export default class BizError extends Error {
  constructor (msg, data, code = 0) {
    super(msg)
    this.data = data
    this.code = code
  }
}
BizError.prototype.name = 'BizError'

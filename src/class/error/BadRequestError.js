// TIP 400
export default class BadRequestError extends Error {}
BadRequestError.prototype.name = 'BadRequestError'

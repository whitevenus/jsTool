// TIP 500
export default class ServerError extends Error {}
ServerError.prototype.name = 'ServerError'

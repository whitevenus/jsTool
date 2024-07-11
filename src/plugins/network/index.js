import axios from 'axios'
import Errors from '@/class/error'
import L from '@f6/lube'
import { Message, Loading } from '@f6/aviator-ui'
import { config } from '@vue/cli-plugin-eslint/eslintOptions'

// import qs from 'qs'

export const createRequest = (baseUrl, options) => {
  const {
    requestHandler,
    responseHandler,
    responseErrorHandler
  } = options
  const instance = axios.create({
    withCredentials: true,
    timeout: 60000
  })
  instance.defaults.baseURL = baseUrl
  instance.interceptors.request.use(config => {
    config.baseURL = L.handleUrlDomain(config.baseURL)
    config.url = L.handleUrlDomain(config.url)
    const requestConfig = requestHandler(config)
    if (!requestConfig) throw new Error('requestHandler 返回不正确')
    return requestConfig
  })
  instance.interceptors.response.use(
    res => {
      if (responseHandler) return responseHandler(res)
      return res
    },
    error => {
      const newError = exceptionInterceptor(error)
      if (newError) return Promise.reject(newError)
      if (responseErrorHandler) return Promise.reject(responseErrorHandler(error))
      return Promise.reject(new Errors.UnknownError('服务器暂时无法访问，请检查网络连接或者稍后再试。'))
    })
  return instance
}

const exceptionInterceptor = error => {
  if (axios.isCancel(error)) return new Errors.RequestCancelError('请求已取消！')
  if (error.code === 'ECONNABORTED') return new Errors.NetworkTimeoutError('服务器请求超时，请稍后再试')
  if (error.message === 'Network Error') return new Errors.NetworkError('服务器暂时无法访问，请检查网络连接或者稍后再试。')
  // TODO error.response.status
  switch (error.response.status) {
    case 302: // 各种登录异常，不统一处理
      return undefined
    case 400:
      return new Errors.BadRequestError('提交数据出错啦！')
    case 401:
      return new Errors.NoPermissionError('无权限访问该页面')
    case 404:
      return new Errors.NotFoundError('404 请求的页面不存在')
    case 500:
      return new Errors.ServerError('系统内部异常，请联系管理员。')
    default:
      return Errors.NetworkError('服务器暂时无法访问，请检查网络连接或者稍后再试。')
  }
}

let loadingService

function openLoading () {
  const defaultOps = {
    body: true,
    fullscreen: true,
    lock: true,
    text: '加载中，请稍后'
  }
  loadingService = Loading.service({ ...defaultOps })
}

function closeLoading () {
  if (loadingService) {
    loadingService.close()
  }
  loadingService = null
}

function handleErrorMessage (response) {
  if (response.data.code === 401) {
    Message.error('没有认证信息，请重新登录')
  } else if (response.data.code === 403) {
    Message.error('没有权限，请联系公司管理员分配权限')
  } else if (response.data.code === 405 || response.data.code === 400) {
    Message.error(response.data.message || response.data.str || '系统错误，请联系管理员')
  } else {
    Message.error('系统错误，请联系管理员')
  }
  return Promise.reject(response)
}

function handleResponse (response, options) {
  closeLoading()
  if (response.data.code === 200 || response.data.code === 0) {
    if (options && options.successMessage && !options.silent) {
      Message({
        message: options.successMessage,
        type: 'success'
      })
    }
    return Promise.resolve(response.data)
  }
  return handleErrorMessage(response)
}

function catchNetworkError (error, silent) {
  closeLoading()
  if (silent) {
    return Promise.reject(error)
  }
  if (error && error.message === 'Network Error') {
    Message.error('网络异常，请检查网络状况')
    return Promise.reject(error)
  }

  if (error && error.request) {
    if (error.request.status === 401) {
      Message.error('没有认证信息，请重新登录')
    } else if (error.request.status === 403) {
      Message.error('没有权限，请联系公司管理员分配权限')
    } else if (error.request.status !== 200) {
      Message.error(`系统错误，请联系管理员${error.request.status}`)
    }
    return Promise.reject(error)
  }

  const message = (error ? error.message : '系统错误，请联系管理员') || '系统错误，请联系管理员'
  Message.error(message)
  return Promise.reject(error)
}

// TIP 在这里修改你的 baseUrl ，如果对应多个后端可以考虑创建多个实例
const axiosInstance = createRequest(CFG.ERP_ADDRESS)
const baseUrl = L.handleUrlDomain(config.baseURL)
/**
 * config:
 * successMessage 成功时需要提醒的消息（silent为false时）
 * silent 错误/成功时不提示信息
 * noLoading  不转圈
 * crossUrl 是否完整的url地址，不需要使用baseErpUrl拼接地址
 * contentType request的contentType
 * params 请求data
 */
export default {
  get (url, { params, successMessage, silent, noLoading, crossUrl } = {}) {
    const config = { params: params }
    if (!crossUrl && !url.startsWith('http')) {
      url = baseUrl + url
      config.headers = {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }
    !noLoading && openLoading()
    return axiosInstance.get(url, config)
      .then(response => handleResponse(response, { successMessage, silent }))
      .catch(error => catchNetworkError(error, silent)).finally(() => closeLoading())
  },
  post (url, data, { successMessage, silent, noLoading, crossUrl, contentType, headers } = {}) {
    const config = {}
    if (!crossUrl) {
      url = baseUrl + url
      config.headers = {
        ...headers,
        'X-Requested-With': 'XMLHttpRequest'
      }
    } else {
      config.headers = {
        ...headers,
        'Content-Type': contentType || 'application/json;charset=UTF-8'
      }
    }
    !noLoading && openLoading()
    return axiosInstance.post(url, data, config)
      .then(response => handleResponse(response, { successMessage, silent }))
      .catch(error => catchNetworkError(error, silent)).finally(() => closeLoading())
  }
}

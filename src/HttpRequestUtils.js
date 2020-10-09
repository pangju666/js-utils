import Axios from 'axios'
import qs from 'qs'

Axios.defaults.withCredentials = true

/**
 * HTTP请求工具类
 *
 * @author nullptr
 * @version 1.0 2020-4-11
 * @since 1.0 2020-4-11
 *
 */
class HttpRequestUtils {
  /**
   * 发送无参数get请求
   *
   * @param {String} url 请求地址
   * @param {Function} callback 响应体回调处理
   */
  static doGetWithoutParams (url, callback) {
    const requestUrl = HttpRequestUtils.urlPrefix + url
    Axios.get(requestUrl)
      .then(response => {
        callback(response.data)
      })
      .catch(error => {
        if (error.hasOwnProperty('response')) {
          callback(this.httpError(error.response))
        }
      })
  }

  /**
   * 发送带参数get请求
   *
   * @param {String} url 请求地址
   * @param {Object} params 请求参数
   * @param {Function} callback 响应体回调处理
   */
  static doGetWithParams (url, params, callback) {
    const requestUrl = HttpRequestUtils.urlPrefix + url
    Axios.get(requestUrl, {params: params})
      .then(response => {
        callback(response.data)
      })
      .catch(error => {
        if (error.hasOwnProperty('response')) {
          callback(this.httpError(error.response))
        }
      })
  }

  /**
   * 发送post请求
   *
   * @param {String} url 请求地址
   * @param {Function} callback 响应体回调处理
   */
  static doPostWithoutParams (url, callback) {
    const requestUrl = HttpRequestUtils.urlPrefix + url
    Axios.post(requestUrl)
      .then(response => {
        callback(response.data)
      })
      .catch(error => {
        if (error.hasOwnProperty('response')) {
          callback(this.httpError(error.response))
        }
      })
  }

  /**
   * 发送post表单参数请求
   *
   * @param {String} url 请求地址
   * @param {Object} params 请求参数
   * @param {Function} callback 响应体回调处理
   */
  static doPostWithFormParams (url, params, callback) {
    const requestUrl = HttpRequestUtils.urlPrefix + url
    Axios.post(requestUrl, qs.stringify(params))
      .then(response => {
        callback(response.data)
      })
      .catch(error => {
        if (error.hasOwnProperty('response')) {
          callback(this.httpError(error.response))
        }
      })
  }

  /**
   * 发送postJSON参数请求
   *
   * @param {String} url 请求地址
   * @param {Object} params 请求参数
   * @param {Function} callback 响应体回调处理
   */
  static doPostWithJSONParams (url, params, callback) {
    const requestUrl = HttpRequestUtils.urlPrefix + url
    Axios.post(requestUrl, params)
      .then(response => {
        callback(response.data)
      })
      .catch(error => {
        if (error.hasOwnProperty('response')) {
          callback(this.httpError(error.response))
        }
      })
  }

  /**
   * 获取登录验证码
   *
   */
  static getVerificationCode (callback) {
    const requestUrl = HttpRequestUtils.urlPrefix + '/login/verificationCode'
    Axios.get(requestUrl, {responseType: 'arraybuffer', withCredentials: true})
      .then(response => {
        // 获取结果集
        const image = 'data:image/png;base64,' + btoa(new Uint8Array(response.data)
          .reduce((data, byte) => data + String.fromCharCode(byte), ''))
        callback(image)
      })
      .catch(error => {
        if (error.hasOwnProperty('response')) {
          callback(this.httpError(error.response))
        }
      })
  }

  /**
   * 文件上传请求
   *
   * @param {String} url 请求地址
   * @param {FormData} params 请求参数
   * @param callback
   */
  static fileUpload (url, params, callback) {
    const requestUrl = HttpRequestUtils.urlPrefix + url
    Axios.post(requestUrl, params)
      .then(response => {
        alert('上传成功')
        callback(response.data)
      })
      .catch(error => {
        if (error.hasOwnProperty('response')) {
          callback(this.httpError(error.response))
        }
      })
  }

  /**
   * 文件下载请求
   *
   * @param {String} url 请求地址
   * @param {Object} params 请求参数
   * @param callback
   */
  static fileDownload (url, params, callback) {
    const requestUrl = HttpRequestUtils.urlPrefix + url
    // 设置请求头部
    const config = {
      params: params,
      responseType: 'blob'
    }
    Axios.get(requestUrl, config)
      .then(response => {
        // 获取文件描述头部信息
        let fileName = response.headers['content-disposition']
        // 获取文件名索引
        let index = fileName.indexOf('filename=') + 9
        // 获取文件名并进行解码
        fileName = decodeURI(fileName.substr(index))
        // 获取返回字节流数据
        const file = {
          name: fileName,
          bytes: new Blob([response.data])
        }
        callback(file)
      })
      .catch(error => {
        if (error.hasOwnProperty('response')) {
          callback(this.httpError(error.response))
        }
      })
  }

  /**
   * http错误描述
   * @param response 响应信息
   * @return {{error: undefined, message: undefined, status: *}}
   */
  static httpError (response) {
    const error = {
      status: response.status,
      error: undefined,
      message: undefined
    }
    if (response.data.hasOwnProperty('error')) {
      error.error = response.data.error
      error.message = response.data.message
    }
    return error
  }
}

HttpRequestUtils.urlPrefix = '/app_diy'

export default HttpRequestUtils

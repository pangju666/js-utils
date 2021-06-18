import Axios from 'axios'
import BaseRequest from '@/utils/request/BaseRequest'

Axios.defaults.withCredentials = true

class AxiosRequest extends BaseRequest {
  constructor(baseUrl = '') {
    super(baseUrl)
  }

  doGet(url, params = {}, requestHeader = {}, responseType = BaseRequest.ResponseType.JSON) {
    return Axios.get(this.baseUrl + url, {
      params: BaseRequest.ContentType.FORM_URLENCODED.stringify(params),
      headers: requestHeader,
      responseType
    })
  }

  doGetByCallback(url, params = {}, requestHeader = {}, callback, errorCallback,
    responseType = BaseRequest.ResponseType.JSON) {
    this.doGet(url, params, requestHeader, responseType)
      .then(response => callback(response))
      .catch(error => errorCallback(error.response))
  }

  doPostWithForm(url, data = {}, requestHeader = {}, responseType = BaseRequest.ResponseType.JSON) {
    requestHeader[BaseRequest.RequestHeader.CONTENT_TYPE] = BaseRequest.ContentType.FORM_URLENCODED
    return Axios.post(this.baseUrl + url, BaseRequest.ContentType.FORM_DATA.stringify(data), { headers: requestHeader, responseType })
  }

  doPostWithFormByCallback(url, data = {}, requestHeader = {}, callback, errorCallback,
    responseType = BaseRequest.ResponseType.JSON) {
    this.doPostWithForm(url, data, requestHeader, responseType)
      .then(response => callback(response))
      .catch(error => errorCallback(error.response))
  }

  doPostWithJSON(url, data = {}, requestHeader = {}, responseType = BaseRequest.ResponseType.JSON) {
    requestHeader[BaseRequest.RequestHeader.CONTENT_TYPE] = BaseRequest.ContentType.APPLICATION_JSON
    return Axios.post(this.baseUrl + url, BaseRequest.ContentType.APPLICATION_JSON.stringify(data), { headers: requestHeader, responseType })
  }

  doPostWithJSONByCallback(url, data = {}, requestHeader = {}, callback, errorCallback,
    responseType = BaseRequest.ResponseType.JSON) {
    try {
      const response = this.doPostWithJSON(url, data, requestHeader, responseType)
      callback(response)
    } catch (error) {
      errorCallback(error.response)
    }
  }

  async fileDownload(url, params = {}, requestHeader = {}) {
    const response = await this.doGet(url, params, requestHeader, BaseRequest.ResponseType.BLOB)
    // 获取文件描述头部信息
    let fileName = response.headers['content-disposition']
    // 获取文件名索引
    const index = fileName.indexOf('filename=') + 9
    // 获取文件名并进行解码
    fileName = decodeURI(fileName.substr(index))
    // 获取返回字节流数据
    return {
      name: fileName,
      bytes: new Blob([response.data])
    }
  }

  async fileDownloadByCallback(url, params = {}, requestHeader = {}, callback, errorCallback) {
    try {
      const file = await this.fileDownload(url, params, requestHeader)
      callback(file)
    } catch (error) {
      errorCallback(error)
    }
  }
}

export default new AxiosRequest()

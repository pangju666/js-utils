import ObjectUtils from '@/utils/ObjectUtils'
import BaseRequest from '@/utils/request/BaseRequest'

export function sendSynchronizeRequest(url, data = {}, requestHeader = {},
  contentType = BaseRequest.ContentType.FORM_URLENCODED,
  responseType = BaseRequest.ResponseType.JSON,
  method = BaseRequest.RequestMethod.GET) {
  const request = new XMLHttpRequest()
  request.withCredentials = true

  let requestData = null
  if (method === 'GET') {
    let getRequestUrl = url
    if (ObjectUtils.isNotNull(data) && ObjectUtils.isObject(data)) {
      const queryParam = []
      let queryParamName
      for (queryParamName in data) {
        queryParam.push(`${queryParamName}=${data[queryParamName]}`)
      }
      getRequestUrl = `${url}?${queryParam.join('&')}`
    }
    request.open(method, encodeURI(getRequestUrl), false)
    request.setRequestHeader(BaseRequest.RequestHeader.CONTENT_TYPE, BaseRequest.ContentType.FORM_URLENCODED.value)
  } else {
    requestData = data
    request.open(method, url, false)
    request.setRequestHeader(BaseRequest.RequestHeader.CONTENT_TYPE, contentType.value)
  }

  let requestHeaderName
  for (requestHeaderName in requestHeader) {
    request.setRequestHeader(requestHeaderName, requestHeader[requestHeader])
  }
  if (ObjectUtils.isNotNull(requestData)) {
    request.send(contentType.stringify(requestData))
  } else {
    request.send(null)
  }
  if (request.status !== 200) {
    throw new Error(request.response)
  }
  request.responseType = responseType
  return request.response
}

class XhrRequest extends BaseRequest {
  constructor(baseUrl = '') {
    super(baseUrl)
  }

  doGet(url, params = {}, requestHeader = {}, responseType = BaseRequest.ResponseType.JSON) {
    return sendSynchronizeRequest(this.baseUrl + url, params, requestHeader, responseType)
  }

  doGetByCallback(url, params = {}, requestHeader = {}, callback, errorCallback,
    responseType = BaseRequest.ResponseType.JSON) {
    try {
      const response = this.doGet(url, params, requestHeader, responseType)
      callback(response)
    } catch (error) {
      errorCallback(error)
    }
  }

  doPostWithForm(url, data = {}, requestHeader = {}, responseType = BaseRequest.ResponseType.JSON) {
    return sendSynchronizeRequest(this.baseUrl + url, data, requestHeader,
      BaseRequest.ContentType.FORM_DATA, responseType, BaseRequest.RequestMethod.POST)
  }

  doPostWithFormByCallback(url, data = {}, requestHeader = {}, callback, errorCallback,
    responseType = BaseRequest.ResponseType.JSON) {
    try {
      const response = this.doPostWithForm(url, data, requestHeader, responseType)
      callback(response)
    } catch (error) {
      errorCallback(error)
    }
  }

  doPostWithJSON(url, data = {}, requestHeader = {}, responseType = BaseRequest.ResponseType.JSON) {
    return sendSynchronizeRequest(this.baseUrl + url, data, requestHeader,
      BaseRequest.ContentType.APPLICATION_JSON, responseType, BaseRequest.RequestMethod.POST)
  }

  doPostWithJSONByCallback(url, data = {}, requestHeader = {}, callback, errorCallback,
    responseType = BaseRequest.ResponseType.JSON) {
    try {
      const response = this.doPostWithJSON(url, data, requestHeader, responseType)
      callback(response)
    } catch (error) {
      errorCallback(error)
    }
  }

  fileDownload(url, data = {}, requestHeader = {}) {
    const response = sendSynchronizeRequest(this.baseUrl + url, data, requestHeader,
      BaseRequest.ContentType.APPLICATION_JSON, BaseRequest.ResponseType.BLOB, BaseRequest.RequestMethod.GET)
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

  fileDownloadByCallback(url, params = {}, requestHeader = {}, callback, errorCallback) {
    try {
      const response = this.fileDownload(url, params, requestHeader, BaseRequest.ResponseType.BLOB)
      callback(response)
    } catch (error) {
      errorCallback(error)
    }
  }
}

export default new XhrRequest()

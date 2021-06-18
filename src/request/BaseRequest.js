import qs from 'qs'

export default class BaseRequest {
  constructor(baseUrl = '') {
    this.baseUrl = baseUrl
  }

  doGet(url, params, requestHeader, responseType) {
  }

  doGetByCallback(url, params, requestHeader, callback, errorCallback, responseType) {
  }

  doPostWithForm(url, data) {
  }

  doPostWithFormByCallback(url, data, callback, errorCallback, requestHeader, responseType) {
  }

  doPostWithJSON(url, data, requestHeader, responseType) {
  }

  doPostWithJSONByCallback(url, data, requestHeader, callback, errorCallback, responseType) {
  }

  fileDownload(url, params, requestHeader) {
  }

  fileDownloadByCallback(url, params, requestHeader, callback, errorCallback) {
  }
}

BaseRequest.RequestMethod = Object.freeze({
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
})

BaseRequest.RequestHeader = Object.freeze({
  CONTENT_TYPE: 'Content-type'
})

BaseRequest.ContentType = Object.freeze({
  APPLICATION_JSON: {
    value: 'application/json;charset=UTF-8',
    stringify: data => JSON.stringify(data)
  },
  FORM_DATA: {
    value: 'multipart/form-data',
    stringify: data => {
      const formData = new FormData()
      Object.keys(data).forEach(formKey => {
        formData.append(formKey, data[formKey])
      })
      return formData
    }
  },
  FORM_URLENCODED: {
    value: 'application/x-www-form-urlencoded',
    stringify: data => qs.stringify(data, { arrayFormat: 'brackets' })
  }
})

BaseRequest.ResponseType = Object.freeze({
  EMPTY: '', // 为空字符串时，采用默认类型 DOMString，与设置为 text 相同。
  ARRAY_BUFFER: 'arraybuffer', // 是一个包含二进制数据的 JavaScript ArrayBuffer。
  BLOB: 'blob', // 是一个包含二进制数据的 Blob 对象
  DOCUMENT: 'document', // 是一个 HTML Document 或 XML XMLDocument，这取决于接收到的数据的 MIME 类型
  JSON: 'json', // 是一个 JavaScript 对象。这个对象是通过将接收到的数据类型视为 JSON 解析得到的。
  TEXT: 'text' // 是一个以 DOMString 对象表示的文本。
})

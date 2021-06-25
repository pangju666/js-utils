export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS',
  PATCH = 'PATCH',
  PURGE = 'PURGE',
  LINK = 'LINK',
  UNLINK = 'UNLINK'
}

export enum HttpHeaders {
  CONTENT_TYPE = 'Content-type'
}

export enum ContentType {
  APPLICATION_JSON = 'application/json;charset=UTF-8',
  FORM_DATA = 'multipart/form-data',
  FORM_URLENCODED = 'application/x-www-form-urlencoded'
}

export enum ResponseType {
    STREAM = 'stream', // IO流类型
    ARRAY_BUFFER = 'arraybuffer', // 是一个包含二进制数据的 JavaScript ArrayBuffer。
    BLOB = 'blob', // 是一个包含二进制数据的 Blob 对象
    DOCUMENT = 'document', // 是一个 HTML Document 或 XML XMLDocument，这取决于接收到的数据的 MIME 类型
    JSON = 'json', // 是一个 JavaScript 对象。这个对象是通过将接收到的数据类型视为 JSON 解析得到的。
    TEXT = 'text' // 是一个以 DOMString 对象表示的文本。
}

import cryptoJS from 'crypto-js'
import HttpRequestUtils from './HttpRequestUtils'

export function passwordEncrypt (key, password) {
  // 使用AES算法进行编码
  const encrypted = cryptoJS.AES.encrypt(
    // 将密码明文解析为wordArray
    cryptoJS.enc.Utf8.parse(password),
    // 对密钥进行base64解码, 并将密钥解析为wordArray
    cryptoJS.enc.Utf8.parse(window.atob(key)),
    // 编码模式
    {
      mode: cryptoJS.mode.ECB,
      padding: cryptoJS.pad.Pkcs7
    })
  // 返回编码后的字符串，注: 返回的字符串已被Base64编码
  return encrypted.toString()
}

export function getSecretKey (callback) {
  HttpRequestUtils.doPostWithoutParams('/secretKey', response => callback(response))
}

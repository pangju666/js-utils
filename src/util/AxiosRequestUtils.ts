import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import AxiosRequest from './axios/AxiosRequest';
import AxiosRequestConfigBuilder from './axios/AxiosRequestConfigBuilder';
import { ObjectUtils } from '../ index';
import qs from 'qs';
import { HttpMethod } from './axios/HttpEnums';

/**
 * axios请求工具类
 */
export default class AxiosRequestUtils {
    private static default: AxiosRequest

    public static getDefault(): AxiosRequest {
        if (ObjectUtils.isNull(this.default)) {
           this.default = new AxiosRequest(AxiosRequestUtils.getDefaultConfig())
        }
        return this.default
    }

    public static setDefault(request: AxiosRequest) {
        if (ObjectUtils.isNotNull(request)) {
            this.default = request
        }
    }

    // eslint-disable-next-line max-params
    public static get(
        url: string,
        params: any,
        requestConfig?: AxiosRequestConfig,
        callback?: (response: AxiosResponse) => void,
        errorCallback?: (error: AxiosError) => void
    ): Promise<any> {
        return this.default.get(url, params, requestConfig, callback, errorCallback)
    }

    // eslint-disable-next-line max-params
    public static post(
        url: string,
        data: any,
        params: any,
        requestConfig?: AxiosRequestConfig,
        callback?: (response: AxiosResponse) => void,
        errorCallback?: (error: AxiosError) => void
    ): Promise<any> {
        return this.default.post(url, data, params, requestConfig, callback, errorCallback)
    }

    // eslint-disable-next-line max-params
    public static put(
        url: string,
        data: any,
        params: any,
        requestConfig?: AxiosRequestConfig,
        callback?: (response: AxiosResponse) => void,
        errorCallback?: (error: AxiosError) => void
    ): Promise<any> {
        return this.default.put(url, data, params, requestConfig, callback, errorCallback)
    }

    // eslint-disable-next-line max-params
    public static delete(
        url: string,
        data: any,
        params: any,
        requestConfig?: AxiosRequestConfig,
        callback?: (response: AxiosResponse) => void,
        errorCallback?: (error: AxiosError) => void
    ): Promise<any> {
        return this.default.delete(url, params, requestConfig, callback, errorCallback)
    }

    // eslint-disable-next-line max-params
    public static sendRequest(
        url: string,
        method: HttpMethod,
        data: any,
        params: any,
        requestConfig?: AxiosRequestConfig,
        callback?: (response: AxiosResponse) => void,
        errorCallback?: (error: AxiosError) => void
    ): Promise<any> {
        return this.default.sendRequest(url, method, data, params, requestConfig, callback, errorCallback)
    }

    public static getDefaultConfig(): AxiosRequestConfig {
        const builder = AxiosRequestConfigBuilder.createInstance()
        builder.withCredentials(true)
        builder.paramsSerializer(params => {
            return qs.stringify(params, { arrayFormat: 'brackets' });
        })
        builder.transformRequest((data, headers) => {
          /*  if (data instanceof Blob) {
                    return data
            } */
            if (!ObjectUtils.isBasicType(data)) {
                const formData = new FormData()
                let isForm = false
                Object.keys(data).forEach(key => {
                    formData.append(key, data[key])
                   /* if (data[key] instanceof Blob) {
                            isForm = true
                    } */
                })
                return isForm ? formData : data
            }
        })
        // TODO: 后续计划对响应数据进行处理
        /* builder.transformResponse((data, headers) => {

         }) */
        return builder.build()
    }
}

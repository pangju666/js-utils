import Axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { HttpMethod } from './HttpEnums';
import { ObjectUtils } from '../../ index';
import StringUtils from '../StringUtils';
import AxiosRequestConfigBuilder from './AxiosRequestConfigBuilder';

/**
 * axios 请求封装类
 */
export default class AxiosRequest {
    private readonly axios: AxiosInstance;

    public constructor(config?: AxiosRequestConfig) {
        this.axios = Axios.create(config);
    }

    // eslint-disable-next-line max-params
    public get(
        url: string,
        params: any,
        requestConfig?: AxiosRequestConfig,
        callback?: (response: AxiosResponse) => void,
        errorCallback?: (error: AxiosError) => void
    ): Promise<any> {
        return this.sendRequest(
            url,
            HttpMethod.GET,
            null,
            params,
            requestConfig,
            callback,
            errorCallback
        );
    }

    // eslint-disable-next-line max-params
    public post(
        url: string,
        data: any,
        params: any,
        requestConfig?: AxiosRequestConfig,
        callback?: (response: AxiosResponse) => void,
        errorCallback?: (error: AxiosError) => void
    ): Promise<any> {
        return this.sendRequest(
            url,
            HttpMethod.POST,
            data,
            params,
            requestConfig,
            callback,
            errorCallback
        );
    }

    // eslint-disable-next-line max-params
    public put(
        url: string,
        data: any,
        params: any,
        requestConfig?: AxiosRequestConfig,
        callback?: (response: AxiosResponse) => void,
        errorCallback?: (error: AxiosError) => void
    ): Promise<any> {
        return this.sendRequest(
            url,
            HttpMethod.PUT,
            data,
            params,
            requestConfig,
            callback,
            errorCallback
        );
    }

    // eslint-disable-next-line max-params
    public delete(
        url: string,
        params: any,
        requestConfig?: AxiosRequestConfig,
        callback?: (response: AxiosResponse) => void,
        errorCallback?: (error: AxiosError) => void
    ): Promise<any> {
        return this.sendRequest(
            url,
            HttpMethod.DELETE,
            null,
            params,
            requestConfig,
            callback,
            errorCallback
        );
    }

    // eslint-disable-next-line max-params
    public sendRequest(
        url: string,
        method: HttpMethod,
        data: any,
        params: any,
        requestConfig?: AxiosRequestConfig,
        callback?: (response: AxiosResponse) => void,
        errorCallback?: (error: AxiosError) => void
    ): Promise<any> {
        const config = ObjectUtils.getSafeValue(requestConfig, AxiosRequestConfigBuilder.createInstance().build());
        config.url = url;
        config.method = method;
        config.params = params;
        if (StringUtils.isAnyEqual(method, HttpMethod.PATCH, HttpMethod.PUT, HttpMethod.POST)) {
            config.data = data;
        } else {
            if (ObjectUtils.isNull(params)) {
                config.params = data;
            }
        }
        const result = this.axios.request(config);
        if (ObjectUtils.isNotNull(callback)) {
            const cbResult = result.then((response) => {
                callback(response);
            });
            if (ObjectUtils.isNotNull(errorCallback)) {
                cbResult.catch((response) => {
                    callback(response);
                });
            }
        }
        return result;
    }
}

import {
    AxiosAdapter,
    AxiosBasicCredentials,
    AxiosProxyConfig,
    AxiosRequestConfig,
    AxiosTransformer,
    CancelToken, Method
} from '_axios@0.21.1@axios';
import { HttpMethod, ResponseType } from './HttpEnums';

export default class AxiosRequestConfigBuilder {
    public static createInstance(): AxiosRequestConfigBuilder {
        return new AxiosRequestConfigBuilder()
    }

    private readonly requestConfig: AxiosRequestConfig;

    private constructor() {
        this.requestConfig = {};
    }

    public url(url: string): AxiosRequestConfigBuilder {
        this.requestConfig.url = url;
        return this;
    }

    public method(method: HttpMethod | Method): AxiosRequestConfigBuilder {
        this.requestConfig.method = method;
        return this;
    }

    public baseURL(baseURL: string): AxiosRequestConfigBuilder {
        this.requestConfig.baseURL = baseURL;
        return this;
    }

    public transformRequest(
        transformRequest: ((data: any, headers?: any) => any) | AxiosTransformer | AxiosTransformer[]
    ): AxiosRequestConfigBuilder {
        this.requestConfig.transformRequest = transformRequest;
        return this;
    }

    public transformResponse(
        transformResponse: AxiosTransformer | AxiosTransformer[]
    ): AxiosRequestConfigBuilder {
        this.requestConfig.transformResponse = transformResponse;
        return this;
    }

    public headers(
        headers: Record<string, unknown> | Map<string, unknown> | string
    ): AxiosRequestConfigBuilder {
        if (headers instanceof Map) {
            this.requestConfig.headers = Object.fromEntries(headers.entries());
        } else if (typeof headers === 'string') {
            this.requestConfig.headers = JSON.parse(headers);
        } else {
            this.requestConfig.headers = headers;
        }
        return this;
    }

    public params(params: any): AxiosRequestConfigBuilder {
        this.requestConfig.params = params;
        return this;
    }

    public paramsSerializer(paramsSerializer: (params: any) => string): AxiosRequestConfigBuilder {
        this.requestConfig.paramsSerializer = paramsSerializer;
        return this;
    }

    public data(data: any): AxiosRequestConfigBuilder {
        this.requestConfig.data = data;
        return this;
    }

    public timeout(timeout: number): AxiosRequestConfigBuilder {
        this.requestConfig.timeout = timeout;
        return this;
    }

    public timeoutErrorMessage(timeoutErrorMessage: string): AxiosRequestConfigBuilder {
        this.requestConfig.timeoutErrorMessage = timeoutErrorMessage;
        return this;
    }

    public withCredentials(withCredentials: boolean): AxiosRequestConfigBuilder {
        this.requestConfig.withCredentials = withCredentials;
        return this;
    }

    public adapter(adapter: AxiosAdapter): AxiosRequestConfigBuilder {
        this.requestConfig.adapter = adapter;
        return this;
    }

    public auth(auth: AxiosBasicCredentials): AxiosRequestConfigBuilder {
        this.requestConfig.auth = auth;
        return this;
    }

    public responseType(responseType: ResponseType): AxiosRequestConfigBuilder {
        this.requestConfig.responseType = responseType;
        return this;
    }

    public xsrfCookieName(xsrfCookieName: string): AxiosRequestConfigBuilder {
        this.requestConfig.xsrfCookieName = xsrfCookieName;
        return this;
    }

    public xsrfHeaderName(xsrfHeaderName: string): AxiosRequestConfigBuilder {
        this.requestConfig.xsrfHeaderName = xsrfHeaderName;
        return this;
    }

    public onUploadProgress(
        onUploadProgress: (progressEvent: any) => void
    ): AxiosRequestConfigBuilder {
        this.requestConfig.onUploadProgress = onUploadProgress;
        return this;
    }

    public maxContentLength(maxContentLength: number): AxiosRequestConfigBuilder {
        this.requestConfig.maxContentLength = maxContentLength;
        return this;
    }

    public validateStatus(
        validateStatus: ((status: number) => boolean) | null
    ): AxiosRequestConfigBuilder {
        this.requestConfig.validateStatus = validateStatus;
        return this;
    }

    public maxBodyLength(maxBodyLength: number): AxiosRequestConfigBuilder {
        this.requestConfig.maxBodyLength = maxBodyLength;
        return this;
    }

    public maxRedirects(maxRedirects: number): AxiosRequestConfigBuilder {
        this.requestConfig.maxRedirects = maxRedirects;
        return this;
    }

    public socketPath(socketPath: string | null): AxiosRequestConfigBuilder {
        this.requestConfig.socketPath = socketPath;
        return this;
    }

    public httpAgent(httpAgent: any): AxiosRequestConfigBuilder {
        this.requestConfig.httpAgent = httpAgent;
        return this;
    }

    public httpsAgent(httpsAgent: any): AxiosRequestConfigBuilder {
        this.requestConfig.httpsAgent = httpsAgent;
        return this;
    }

    public proxy(proxy: AxiosProxyConfig | false): AxiosRequestConfigBuilder {
        this.requestConfig.proxy = proxy;
        return this;
    }

    public cancelToken(cancelToken: CancelToken): AxiosRequestConfigBuilder {
        this.requestConfig.cancelToken = cancelToken;
        return this;
    }

    public decompress(decompress: boolean): AxiosRequestConfigBuilder {
        this.requestConfig.decompress = decompress;
        return this;
    }

    public build(): AxiosRequestConfig {
        return this.requestConfig;
    }
}

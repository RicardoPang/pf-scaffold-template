import type { AxiosRequestConfig, AxiosResponse } from 'axios'

// 针对AxiosRequestConfig配置进行扩展
export interface PFInterceptors<T = AxiosResponse> {
  requestSuccessFn?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestFailureFn?: (err: unknown) => unknown
  responseSuccessFn?: (res: T) => T
  responseFailureFn?: (err: unknown) => unknown
}

export interface PFRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: PFInterceptors<T>
}

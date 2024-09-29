import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { PFRequestConfig } from './type'

class PFRequest {
  private instance: AxiosInstance

  constructor(config: PFRequestConfig) {
    this.instance = axios.create(config)

    // 添加全局拦截器
    this.setupGlobalInterceptors(config)
  }

  private setupGlobalInterceptors(config: PFRequestConfig) {
    this.instance.interceptors.request.use(
      (config) => config,
      (err) => Promise.reject(err)
    )

    this.instance.interceptors.response.use(
      (res) => res.data,
      (err) => Promise.reject(err)
    )

    // 添加实例拦截器
    if (config.interceptors) {
      this.instance.interceptors.request.use(
        config.interceptors.requestSuccessFn as any,
        config.interceptors.requestFailureFn
      )
      this.instance.interceptors.response.use(
        config.interceptors.responseSuccessFn,
        config.interceptors.responseFailureFn
      )
    }
  }

  request<T = any>(config: PFRequestConfig<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      // 单次请求的成功拦截处理
      if (config.interceptors?.requestSuccessFn) {
        config = config.interceptors.requestSuccessFn(config)
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch(reject)
    })
  }

  get<T = any>(config: PFRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }

  post<T = any>(config: PFRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }

  delete<T = any>(config: PFRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: PFRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default PFRequest

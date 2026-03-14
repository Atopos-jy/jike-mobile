//axios的封装处理

//根域名配置
//超时时间
import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type AxiosError,
  type InternalAxiosRequestConfig,
  type AxiosRequestConfig,
} from "axios";
import { router } from "@/router";

import type { ApiResponse } from "@/type/api";

// Params：URL 参数（get/delete 请求用）
type RequestParams = AxiosRequestConfig["params"];
// Data：请求体数据（post/put 请求用）
type RequestData = AxiosRequestConfig["data"];
const request: AxiosInstance = axios.create({
  baseURL: "http://geek.itheima.net/v1_0",
  timeout: 5000,
});
// 添加请求拦截器
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    //操作这个config注入token数据
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);
// 添加响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  },
  (error: AxiosError) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (error.response?.status === 401) {
      router.navigate("/home");
      //强制刷新
      window.location.reload();
    }
    return Promise.reject(error);
  },
);

const http = {
  get<T>(url: string, params?: RequestParams): Promise<ApiResponse<T>> {
    return request
      .get<ApiResponse<T>>(url, { params })
      .then((res) => res.data as ApiResponse<T>);
  },
  post<T>(url: string, data?: RequestData): Promise<ApiResponse<T>> {
    return request
      .post<ApiResponse<T>>(url, data)
      .then((res) => res.data as ApiResponse<T>);
  },
  put<T>(url: string, data?: RequestData): Promise<ApiResponse<T>> {
    return request
      .put<ApiResponse<T>>(url, data)
      .then((res) => res.data as ApiResponse<T>);
  },
  delete<T>(url: string, params?: RequestParams): Promise<ApiResponse<T>> {
    return request
      .delete<ApiResponse<T>>(url, { params })
      .then((res) => res.data as ApiResponse<T>);
  },
  fetch<T>(url: string, params?: RequestParams): Promise<ApiResponse<T>> {
    return request
      .get<ApiResponse<T>>(url, { params })
      .then((res) => res.data as ApiResponse<T>);
  },
};

export default http;

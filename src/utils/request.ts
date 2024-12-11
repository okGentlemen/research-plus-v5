import axios, { AxiosResponse } from "axios";
import { message } from "antd";
import { store } from "@/store";
import { logout } from "@/store/slices/user";

interface ApiResponse<T = any> {
  code: number;
  data: T;
  message: string;
  msg: string;
}

const request = axios.create({
  baseURL: import.meta.env.VITE_API_USER_HOST,
  timeout: 90000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
request.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    console.log(response);
    const { code, data, message: resMessage, msg } = response.data;
    const resMsg = resMessage || msg;

    if (code === 0) {
      return {
        code,
        data,
        message: resMsg,
        msg: resMsg,
      } as unknown as AxiosResponse<ApiResponse>;
    }

    // Token expired or invalid
    if (code === 401) {
      store.dispatch(logout());
      message.error("登录已过期，请重新登录");
      return Promise.reject(new Error(resMsg));
    }

    message.error(resMsg || "请求失败");

    return {
      code,
      data,
      message: resMsg,
      msg: resMsg,
    } as unknown as AxiosResponse<ApiResponse>;
  },
  (error) => {
    const { response } = error;

    if (response) {
      const { status, data } = response;
      switch (status) {
        case 400:
          message.error(data.message || "请求参数错误");
          break;
        case 401:
          message.error("登录已过期，请重新登录");
          store.dispatch(logout());
          break;
        case 403:
          message.error("没有权限访问");
          break;
        case 404:
          message.error("请求的资源不存在");
          break;
        case 500:
          message.error("服务器错误，请稍后重试");
          break;
        default:
          message.error("网络错误，请稍后重试");
      }
    } else if (error.request) {
      message.error("网络连接失败，请检查网络");
    } else {
      message.error(error.message || "请求失败");
    }

    return Promise.reject(error);
  }
);

export { request };

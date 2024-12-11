import { message } from 'antd';
import type { App } from 'react';

export const setupErrorHandler = (app: App) => {
  app.config.errorHandler = (err, instance, info) => {
    console.error('Error:', err);
    console.error('Component:', instance);
    console.error('Info:', info);
    
    message.error('系统异常，请稍后重试');
  };
};

export const handleRequestError = (error: any) => {
  if (error.response) {
    const { status, data } = error.response;
    switch (status) {
      case 400:
        message.error(data.message || '请求参数错误');
        break;
      case 401:
        message.error('登录已过期，请重新登录');
        break;
      case 403:
        message.error('没有权限访问');
        break;
      case 404:
        message.error('请求的资源不存在');
        break;
      case 500:
        message.error('服务器错误，请稍后重试');
        break;
      default:
        message.error('网络错误，请稍后重试');
    }
  } else if (error.request) {
    message.error('网络连接失败，请检查网络');
  } else {
    message.error(error.message || '请求失败');
  }
};
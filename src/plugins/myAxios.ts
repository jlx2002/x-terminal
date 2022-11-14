/*
 * @Description: 请填写文件简介
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-16 14:57:27
 * @LastEditors: jlx
 * @LastEditTime: 2022-11-14 18:01:41
 */
import axios from "axios";

const configs = {
  //   https://teriminal-6243-4-1309167060.sh.run.tcloudbase.com/api
  // http://localhost:7345/api
  baseURL: "https://teriminal-6243-4-1309167060.sh.run.tcloudbase.com/api",
  timeout: 5000,
};

// 自定义 axios 实例
const myAxios = axios.create(configs);

myAxios.defaults.withCredentials = true;

// 添加请求拦截器
myAxios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
myAxios.interceptors.response.use(
  function (response) {
    console.log(response);
    // 对响应数据做点什么
    return response.data;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default myAxios;

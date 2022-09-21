/*
 * @Description: 请填写文件简介
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-17 21:30:55
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-21 15:02:09
 */
import myAxios from "@/plugins/myAxios";

/**
 * @description: 用户登录
 * @param {string} username
 * @param {string} password
 * @return {*}
 * @author: jlx
 */
export const userLogin = async (username: string, password: string) => {
  if (!username || !password) {
    return null;
  }
  return await myAxios.post("/user/login", { username, password });
};

/**
 * @description: 用户登出
 * @return {*}
 * @author: jlx
 */
export const userLogout = async () => {
  return await myAxios.post("/user/logout");
};

/**
 * @description: 用户注册
 * @return {*}
 * @author: jlx
 */
export const userRegister = async (
  username: string,
  password: string,
  email: string
) => {
  if (!username || !password || !email) {
    return null;
  }
  return await myAxios.post("/user/register", { username, password, email });
};

/**
 * @description: 获取当前登录用户
 * @return {*}
 * @author: jlx
 */
export const getLoginUser = async () => {
  return await myAxios.post("/user/current");
};

/**
 * @description: 获取书签列表
 * @return {*}
 * @author: jlx
 */
export const getBookmarkList = async () => {
  return await myAxios.post("/bookmark/get");
};

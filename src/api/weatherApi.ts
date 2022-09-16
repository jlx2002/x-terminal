/*
 * @Description: 请填写文件简介
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-16 15:29:42
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-16 15:35:36
 */
import myAxios from "@/plugins/myAxios";

/**
 * @description: 获取当前天气
 * @param {string} city
 * @return {*}
 * @author: jlx
 */
export const getCurrentWeather = async (city: string) => {
  if (!city) {
    return null;
  }
  return await myAxios.post("/weather/now", { city: city });
};

/**
 * @description: 获取未来三天天气预报
 * @param {string} city
 * @return {*}
 * @author: jlx
 */
export const getFutureWeather = async (city: string) => {
  if (!city) {
    return null;
  }
  return await myAxios.post("/weather/future", { city: city });
};

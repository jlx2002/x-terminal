/*
 * @Description: 网易云音乐api
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-17 21:31:26
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-18 09:30:08
 */
import myAxios from "@/plugins/myAxios";

/**
 * @description: 关键词获取 网易云音乐id
 * @param {string} keyword
 * @return {*}
 * @author: jlx
 */
export const getNeteaseMusicByKeyword = async (keyword: string) => {
  if (keyword == "") {
    return null;
  }
  return await myAxios.post("/music/get", { keywords: keyword });
};

/**
 * @description: 获取网易云热门榜单列表
 * @return {*}
 * @author: jlx
 */
export const getNeteaseMusicHotList = async () => {
  return await myAxios.post("/music/list/hot");
};

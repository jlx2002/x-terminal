/*
 * @Description: 掘金文章api
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-17 21:31:03
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-18 09:32:06
 */
import myAxios from "@/plugins/myAxios";

/**
 * @description: 随机获取  size 篇文章
 * @param {number} pageSize
 * @return {*}
 * @author: jlx
 */
export const getArticleRandom = async (pageSize: number) => {
  return await myAxios.post("/article/get/random", { size: pageSize });
};

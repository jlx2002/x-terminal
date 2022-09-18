/*
 * @Description: 请填写文件简介
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-17 21:30:32
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-17 22:19:43
 */
import myAxios from "@/plugins/myAxios";

/**
 * @description: 获取翻译结果
 * @param {string} sentence
 * @return {*}
 * @author: jlx
 */
export const getTranslateAns = async (sentence: string) => {
  return await myAxios.post("/translate/zh-cn", { sentence: sentence });
};

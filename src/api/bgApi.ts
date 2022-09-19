/*
 * @Description: 请填写文件简介
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-19 17:25:35
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-19 17:33:27
 */
import myAxios from "@/plugins/myAxios";

/**
 * @description: 随机获取背景图片
 * @return {*}
 * @author: jlx
 */
export const getBackgroundRandom = async () => {
  return await myAxios.post("bg/get/random");
};

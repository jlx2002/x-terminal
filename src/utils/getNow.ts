/*
 * @Description: 请填写文件简介
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-18 16:04:47
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-18 16:17:05
 */
import dayjs from "@/plugins/myDayjs";
export const getNow = () => {
  return `当前时间为：` + dayjs().format("YYYY-MM-DD a hh:mm:ss");
};

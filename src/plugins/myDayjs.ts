/*
 * @Description: 请填写文件简介
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-15 20:43:38
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-15 20:46:09
 */
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import Duration from "dayjs/plugin/duration";
import isBetween from "dayjs/plugin/isBetween";

// 全局设置为中文
dayjs.locale("zh-cn");
dayjs.extend(Duration);
dayjs.extend(isBetween);

export default dayjs;

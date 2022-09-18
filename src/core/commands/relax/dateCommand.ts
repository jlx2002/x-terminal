/*
 * @Description: 获取当前日期及时间
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-18 09:56:51
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-18 16:23:49
 */
import { CommandType } from "@/core/command";
import { getNow } from "@/utils/getNow";
/**
 * @description: 获取当前日期时间， 预计后期扩展，把某些todo做成一个列表，反馈倒计时的形式
 * @return {*}
 * @author: jlx
 */
const dateCommand: CommandType = {
  func: "date",
  name: "获取当前时间",
  alias: ["now", "today"],
  options: [],
  action(options, terminal): void {
    terminal.writeTextSuccessResult(getNow());
  },
};

export default dateCommand;

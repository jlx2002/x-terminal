/*
 * @Description: 请填写文件简介
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-17 21:27:41
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-18 09:36:19
 */
import { CommandType } from "@/core/command";

/**
 * @description: 清屏 clear 命令
 * @return {*}
 * @author: jlx
 */
const clearCommand: CommandType = {
  func: "clear",
  name: "清屏",
  alias: ["cl"],
  options: [],
  action(options, terminal): void {
    // 延时，把当前这条 clear 命令也清掉
    setTimeout(() => {
      terminal.clear();
    }, 100);
  },
};

export default clearCommand;

/*
 * @Description: 请填写文件简介
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-18 17:01:39
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-19 19:59:44
 */
import { CommandType } from "@/core/command";
import { useTerminalConfigStore } from "@/store/config/terminalConfigStore";

/**
 * @description: 重置配置
 * @return {*}
 * @author: jlx
 */
const resetCommand: CommandType = {
  func: "reset",
  name: "重置终端配置",
  alias: [],
  options: [],
  action(options, terminal): void {
    const { reset } = useTerminalConfigStore();
    reset();
    terminal.writeTextSuccessResult("已重置终端配置");
  },
};

export default resetCommand;

/*
 * @Description: 请填写文件简介
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-18 17:01:30
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-19 19:53:11
 */
import { CommandType } from "@/core/command";
import { useTerminalConfigStore } from "@/store/config/terminalConfigStore";

/**
 * @description: hint 开关提示
 * @return {*}
 * @author: jlx
 */
const hintCommand: CommandType = {
  func: "hint",
  name: "开关提示",
  desc: "开启 / 关闭输入提示",
  params: [
    {
      key: "switch",
      desc: "开关：on 开启, off 关闭",
      defaultValue: "on",
    },
  ],
  options: [],
  async action(options, terminal) {
    const { _ } = options;
    const { setOrToggleShowHint } = useTerminalConfigStore();
    let newHint;
    if (_.length >= 1) {
      if (["on", "off"].includes(_[0])) {
        newHint = _[0];
      }
    }
    const res = setOrToggleShowHint(newHint);
    terminal.writeTextSuccessResult(
      `输入提示已${res ? "开启" : "关闭"}，刷新页面后生效`
    );
  },
};

export default hintCommand;

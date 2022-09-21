/*
 * @Description: 请填写文件简介
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-21 09:54:28
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-21 10:48:19
 */
import { CommandType } from "@/core/command";
import { useUserStore } from "@/store/userStore";
import loginCommand from "./subCommands/loginCommand";
import logoutCommand from "./subCommands/logoutCommand";
import registerCommand from "./subCommands/registerCommand";
import { LOCAL_USER } from "./userConstant";

/**
 * @description:
 * @return {*}
 * @author: jlx
 */
const userCommand: CommandType = {
  func: "user",
  name: "用户",
  alias: [],
  params: [
    {
      key: "subCommand",
      desc: "子命令",
      required: true,
    },
  ],
  subCommands: {
    login: loginCommand,
    register: registerCommand,
    logout: logoutCommand,
  },
  options: [],
  async action(options, terminal) {
    const { loginUser } = useUserStore();
    if (loginUser && loginUser.username !== LOCAL_USER.username) {
      let text = `当前用户：${loginUser.username}`;
      if (loginUser.email) {
        text += ` ${loginUser.email}`;
      }
      terminal.writeTextResult(text);
    } else {
      terminal.writeTextErrorResult("未登录，请执行 user login 命令登录");
    }
  },
};

export default [userCommand];

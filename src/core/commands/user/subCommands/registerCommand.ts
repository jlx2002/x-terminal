/*
 * @Description:  用户注册命令
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-21 09:54:57
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-22 17:55:09
 */
import { CommandType } from "@/core/command";
import { userLogin, userRegister } from "@/api/userApi";
import { useUserStore } from "@/store/userStore";
import { replaceEqual } from "@/utils/removeEqual";

/**
 * @description: 用户注册命令
 * @return {*}
 * @author: jlx
 */
const registerCommand: CommandType = {
  func: "register",
  name: "用户注册",
  options: [
    {
      key: "username",
      desc: "用户名",
      alias: ["u"],
      type: "string",
      required: true,
    },
    {
      key: "password",
      desc: "密码",
      alias: ["p"],
      type: "string",
      required: true,
    },
    {
      key: "email",
      desc: "邮箱",
      alias: ["e"],
      type: "string",
      required: true,
    },
  ],
  async action(options, terminal) {
    let { username, password, email } = options;
    // 替换掉等号
    username = replaceEqual(username);
    password = replaceEqual(password);
    email = replaceEqual(email);
    if (!username) {
      terminal.writeTextErrorResult("请输入用户名");
      return;
    }
    if (!password) {
      terminal.writeTextErrorResult("请输入密码");
      return;
    }
    if (!email) {
      terminal.writeTextErrorResult("请输入邮箱");
      return;
    }
    const res: any = await userRegister(username, password, email);
    if (res?.code === 0) {
      terminal.writeTextSuccessResult("注册成功");
    } else {
      terminal.writeTextErrorResult(res?.message ?? "注册失败");
    }
  },
};

export default registerCommand;

/*
 * @Description: 用户登录命令
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-21 09:54:48
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-21 11:01:34
 */
import { CommandType } from "@/core/command";
import { userLogin, userRegister, userLogout } from "@/api/userApi";
import { useUserStore } from "@/store/userStore";
import { replaceEqual } from "@/utils/removeEqual";

/**
 * @description: 用户登录命令
 * @return {*}
 * @author: jlx
 */
const loginCommand: CommandType = {
  func: "login",
  name: "用户登录",
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
  ],
  async action(options, terminal) {
    let { username, password } = options;
    // 去除等号
    username = replaceEqual(username);
    password = replaceEqual(password);
    if (!username) {
      terminal.writeTextErrorResult("请输入用户名");
      return;
    }
    if (!password) {
      terminal.writeTextErrorResult("请输入密码");
      return;
    }
    const res: any = await userLogin(username, password);
    const { setLoginUser } = useUserStore();
    if (res?.code === 0) {
      setLoginUser(res.data);
      terminal.writeTextSuccessResult("登录成功");
    } else {
      terminal.writeTextErrorResult(res?.message ?? "登录失败");
    }
  },
};

export default loginCommand;

/*
 * @Description: 用户登出命令
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-21 10:24:08
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-21 10:48:58
 */
import { CommandType } from "@/core/command";
import { userLogin, userRegister, userLogout } from "@/api/userApi";
import { useUserStore } from "@/store/userStore";
import { LOCAL_USER } from "../userConstant";

/**
 * @description: 用户登出命令
 * @return {*}
 * @author: jlx
 */
const logoutCommand: CommandType = {
  func: "logout",
  name: "用户注销",
  options: [],
  async action(options, terminal) {
    const res: any = await userLogout();
    const { setLoginUser } = useUserStore();
    if (res?.code === 0) {
      setLoginUser(LOCAL_USER);
      terminal.writeTextSuccessResult("已退出登录");
    } else {
      terminal.writeTextErrorResult(res?.message ?? "注销失败");
    }
  },
};

export default logoutCommand;

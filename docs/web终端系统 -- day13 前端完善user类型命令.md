## web终端系统 -- day13 前端完善user类型命令

### login 登录命令

登录通过options 里面的-u和-p来得到用户名和密码， 获取相关信息之后发送请求，通过请求返回结果，输出终端结果

```typescript
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

```



### register 注册命令

和上述同理，验证一下参数后提交后端请求

```typescript
import { CommandType } from "@/core/command";
import { userLogin, userRegister, userLogout } from "@/api/userApi";
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

```



### logout 退出登录命令

和上述同理

```typescript
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

```


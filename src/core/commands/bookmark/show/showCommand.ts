/*
 * @Description: 展示书签列表
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-21 11:09:11
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-22 19:46:20
 */
import { CommandType } from "@/core/command";
import { defineAsyncComponent } from "vue";
import ComponentOutputType = Terminal.ComponentOutputType;
import { useUserStore } from "@/store/userStore";
import { LOCAL_USER } from "@/core/commands/user/userConstant";
import { getBookmarkList } from "@/api/userApi";
/**
 * @description: 展示 已收藏的书签列表
 * @return {*}
 * @author: jlx
 */
const showCommand: CommandType = {
  func: "show",
  name: "展示已收藏的书签",
  alias: [""],
  options: [],
  collapsible: true,
  async action(options, terminal) {
    const { token } = useUserStore();
    // 查询当前用户是否登录，如果没有登录
    if (!token) {
      terminal.writeTextErrorResult("未登录，请执行 user login 命令登录");
      return;
    }
    const result: any = await getBookmarkList(token);
    if (result?.code === 500) {
      terminal.writeTextErrorResult("出现异常");
      return;
    }
    const output: ComponentOutputType = {
      type: "component",
      component: defineAsyncComponent(() => import("./bookmarkBox.vue")),
    };
    terminal.writeResult(output);
    return;
  },
};

export default showCommand;

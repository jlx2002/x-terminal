/*
 * @Description: 请填写文件简介
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-21 11:09:23
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-22 17:58:09
 */
import { CommandType } from "@/core/command";
import { removeBookmark } from "@/api/userApi";
import { replaceEqual } from "@/utils/removeEqual";
import { useUserStore } from "@/store/userStore";
const { token } = useUserStore();

/**
 * @description: 移除书签
 * @return {*}
 * @author: jlx
 */
const removeCommand: CommandType = {
  func: "remove",
  name: "删除书签",
  alias: ["delete", "pop"],
  desc: "删除书签成功后重新登录后生效",
  params: [],
  options: [
    {
      key: "func",
      desc: "命令英文",
      alias: ["f"],
      type: "string",
      required: true,
    },
  ],
  async action(options, terminal) {
    let { func } = options;
    // 检验参数是否为空
    if (func) {
      func = replaceEqual(func);
      const res: any = await removeBookmark(func, token);
      if (res?.code === 500) {
        terminal.writeTextErrorResult("用户没有登录，不能进行该操作");
      } else if (res?.code != 0) {
        terminal.writeTextErrorResult("不存在该key！");
      } else {
        terminal.writeTextSuccessResult("书签删除成功!");
      }
    }
    // 参数不全，提示参数不全，无法添加书签
    else {
      terminal.writeTextErrorResult("参数不全，无法删除书签！");
    }
  },
};

export default removeCommand;

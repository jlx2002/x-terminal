/*
 * @Description: 请填写文件简介
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-21 11:08:51
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-22 17:57:39
 */
import { addBookmark } from "@/api/userApi";
import { CommandType } from "@/core/command";
import { replaceEqual } from "@/utils/removeEqual";
import { useUserStore } from "@/store/userStore";
const { token } = useUserStore();
/**
 * @description: 添加书签 命令
 * @return {*}
 * @author: jlx
 */
const addCommand: CommandType = {
  func: "add",
  name: "添加书签",
  alias: ["join", "attach", "push", "append"],
  desc: "添加书签成功后重新登录后生效",
  params: [],
  options: [
    {
      key: "func",
      desc: "命令英文",
      alias: ["f"],
      type: "string",
      required: true,
    },
    {
      key: "url",
      desc: "链接地址",
      alias: ["u"],
      type: "string",
      required: true,
    },
    {
      key: "desc",
      desc: "介绍",
      alias: ["d"],
      type: "string",
      defaultValue: "略",
    },
    {
      key: "alias",
      desc: "书签别名",
      alias: ["a"],
      type: "string",
    },
  ],
  async action(options, terminal) {
    let { func, url, desc, alias } = options;
    const url_test =
      /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/;
    // 检验参数是否为空
    if (func && url) {
      // 正则 判断link
      if (url_test.test(url)) {
        func = replaceEqual(func);
        url = replaceEqual(url);
        desc = replaceEqual(desc);
        alias = replaceEqual(alias);
        const res: any = await addBookmark(
          {
            keys: func,
            url,
            desc,
            nickname: alias,
          },
          token
        );
        if (res?.code === 500) {
          terminal.writeTextErrorResult("用户没有登录，不能进行该操作");
        } else {
          terminal.writeTextSuccessResult("书签添加成功!");
        }
      } else {
        terminal.writeTextErrorResult("链接参数错误！");
      }
    }
    // 参数不全，提示参数不全，无法添加书签
    else {
      terminal.writeTextErrorResult("参数不全，无法添加书签！");
    }
  },
};

export default addCommand;

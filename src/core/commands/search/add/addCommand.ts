/*
 * @Description: 添加搜索命令
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-15 16:56:53
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-15 19:33:03
 */
import { CommandType } from "@/core/command";

// 扩展命令字典
const fromExtarDict: Record<string, CommandType> = {};

/**
 * @description: 添加 搜索命令
 * @return {*}
 * @author: jlx
 */
const addCommand: CommandType = {
  func: "add",
  name: "添加搜索引擎",
  alias: ["join", "attach", "push", "append"],
  params: [],
  options: [
    {
      key: "func",
      desc: "命令英文",
      alias: ["f"],
      type: "string",
    },
    {
      key: "name",
      desc: "命令名称",
      alias: ["n"],
      type: "string",
      defaultValue: "扩展命令",
    },
    {
      key: "desc",
      desc: "介绍",
      alias: ["d"],
      type: "string",
      defaultValue: "略",
    },
    {
      key: "link",
      desc: "搜索引擎链接：",
      alias: ["l"],
      type: "string",
    },
  ],
  action(options, terminal) {
    const { func, name, desc, link } = options;
    // 是否已经 添加过该命令
    if (fromExtarDict[func]) {
      terminal.writeTextErrorResult("已经添加过该命令，不能重复添加！");
    }
    const url_test =
      /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/;
    if (func && name && link) {
      // 正则 判断link
      if (url_test.test(link)) {
        //  new 扩展命令
        const extraCommand: CommandType = {
          func: func,
          name: name,
          desc: desc,
          alias: [],
          params: [
            {
              key: "word",
              desc: "搜索内容",
              required: true,
            },
          ],
          options: [],
          action: function (options: any, terminal: any) {
            const { _ } = options;
            const word = _.length > 0 ? _[0] : "";
            // https://cn.bing.com/search?q=b
            let targetLink = `${link}${word}`;
            window.open(targetLink);
          },
        };
        fromExtarDict[func] = extraCommand;
      } else {
        terminal.writeTextErrorResult("链接参数错误！");
      }
    } else {
      terminal.writeTextErrorResult("参数不全，无法生成命令！");
    }
  },
};

export { addCommand, fromExtarDict };

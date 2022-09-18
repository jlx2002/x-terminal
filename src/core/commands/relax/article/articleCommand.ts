/*
 * @Description: 请填写文件简介
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-18 17:11:33
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-18 22:29:47
 */
import { CommandOptionType, CommandType } from "@/core/command";
import { defineAsyncComponent } from "vue";
import ComponentOutputType = Terminal.ComponentOutputType;

/**
 * @description: 掘金随机文章命令
 * @return {*}
 * @author: jlx
 */
const articleCommand: CommandType = {
  func: "article",
  name: "掘金文章随机若干篇",
  alias: ["arti"],
  options: [
    {
      key: "size",
      desc: "文章篇数",
      alias: ["s"],
      type: "string",
    },
  ],
  collapsible: true,
  action(options, terminal) {
    let { size = "20" } = options;
    if (size.startsWith("=")) size = size.replace("=", "");
    size = parseInt(size);
    if (size >= 100 || isNaN(size)) {
      terminal.writeTextErrorResult("请求参数不合法!");
      return;
    }
    const output: ComponentOutputType = {
      type: "component",
      component: defineAsyncComponent(() => import("./article.vue")),
      props: {
        size,
      },
    };
    terminal.writeResult(output);
    return;
  },
};

export default articleCommand;

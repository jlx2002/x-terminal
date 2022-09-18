/*
 * @Description: 请填写文件简介
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-18 17:11:33
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-18 17:34:50
 */
import { CommandOptionType, CommandType } from "@/core/command";
import { defineAsyncComponent } from "vue";
import ComponentOutputType = Terminal.ComponentOutputType;

const articleCommand: CommandType = {
  func: "article",
  name: "掘金文章随机若干篇",
  alias: ["arti"],
  options: [
    {
      key: "size",
      desc: "文章篇数",
      alias: ["s"],
      type: "number",
    },
  ],
  collapsible: true,
  action(options, terminal) {
    const { size = 20 } = options;
    if (size >= 100) {
      terminal.writeTextErrorResult("请求参数过大,请更换小于100的参数!");
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

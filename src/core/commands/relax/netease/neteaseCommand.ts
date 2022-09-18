/*
 * @Description: 网易云音乐 搜索关键词
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-18 20:26:18
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-18 22:30:09
 */
import { CommandOptionType, CommandType } from "@/core/command";
import { defineAsyncComponent } from "vue";
import ComponentOutputType = Terminal.ComponentOutputType;

/**
 * @description: 网易云搜索命令
 * @return {*}
 * @author: jlx
 */
const musicCommand: CommandType = {
  func: "music",
  name: "网易云音乐搜索",
  alias: ["netease", "yinyue"],
  params: [
    {
      key: "word",
      desc: "搜索内容",
      required: true,
    },
  ],
  options: [
    {
      key: "self",
      desc: "当前页面播放",
      alias: ["s"],
      type: "boolean",
    },
  ],
  collapsible: true,
  action(options, terminal) {
    const { _, self } = options;
    const word = _.length > 0 ? _[0] : "";
    if (word === "") {
      terminal.writeTextErrorResult("搜索关键词不能为空！");
      return;
    }
    // 如果选择 当前页面播放 则输出音乐盒子 组件
    if (self) {
      const output: ComponentOutputType = {
        type: "component",
        component: defineAsyncComponent(() => import("./musicBox.vue")),
        props: {
          word,
        },
      };
      terminal.writeResult(output);
      return;
    }
    // 没有选择-s，则打开外链
    window.open(`https://music.163.com/#/search/m/?s=${word}`);
  },
};

export default musicCommand;

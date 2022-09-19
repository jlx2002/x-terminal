/*
 * @Description: 快捷键命令shortcutCommand
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-19 20:38:40
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-19 21:25:37
 */
import { CommandType } from "@/core/command";
import { defineAsyncComponent } from "vue";
import ComponentOutputType = Terminal.ComponentOutputType;

/**
 * @description: 快捷键命令
 * @return {*}
 * @author: jlx
 */
const shortcutCommand: CommandType = {
  func: "shortcut",
  name: "快捷键",
  desc: "查看快捷键",
  alias: [],
  params: [],
  options: [],
  collapsible: true,
  action(options, terminal): void {
    const output: ComponentOutputType = {
      type: "component",
      component: defineAsyncComponent(() => import("./shortcutBox.vue")),
    };
    terminal.writeResult(output);
  },
};

export default shortcutCommand;

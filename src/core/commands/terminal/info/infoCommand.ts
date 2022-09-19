/*
 * @Description: 请填写文件简介
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-19 20:37:34
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-19 20:56:34
 */
import { CommandType } from "@/core/command";
import { defineAsyncComponent } from "vue";
import ComponentOutputType = Terminal.ComponentOutputType;

/**
 * @description: info 本站信息命令
 * @return {*}
 * @author: jlx
 */
const infoCommand: CommandType = {
  func: "info",
  name: "查看本站信息",
  alias: ["author", "about"],
  options: [],
  action(options, terminal): void {
    const output: ComponentOutputType = {
      type: "component",
      component: defineAsyncComponent(() => import("./InfoBox.vue")),
    };
    terminal.writeResult(output);
  },
};

export default infoCommand;

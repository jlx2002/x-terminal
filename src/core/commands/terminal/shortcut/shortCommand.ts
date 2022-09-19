/*
 * @Description: 请填写文件简介
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-19 20:38:40
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-19 20:49:32
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
      component: defineAsyncComponent(() => import("./ShortcutBox.vue")),
    };
    terminal.writeResult(output);
  },
};

export default shortcutCommand;

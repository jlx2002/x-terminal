/*
 * @Description: weather 命令
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-15 16:27:20
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-20 22:36:01
 */
import { CommandOptionType, CommandType } from "@/core/command";
import { defineAsyncComponent } from "vue";
import ComponentOutputType = Terminal.ComponentOutputType;

/**
 * @description: 天气命令
 * @return {*}
 * @author: jlx
 */
const weatherCommand: CommandType = {
  func: "weather",
  name: "天气预报",
  alias: ["wea"],
  params: [
    {
      key: "city",
      desc: "城市名称",
      required: true,
    },
  ],
  options: [
    {
      key: "now",
      desc: "当前天气",
      alias: ["n"],
      type: "boolean",
      defaultValue: true,
    },
    {
      key: "future",
      desc: "未来三天天气",
      alias: ["f"],
      type: "boolean",
    },
  ],
  collapsible: true,
  action(options, terminal) {
    const { _, now, future } = options;
    const city = _.length > 0 ? _[0] : "";
    // 如果 城市为空
    if (city == "") {
      terminal.writeTextErrorResult("城市参数不能为空！");
      return;
    }
    // 获取未来三天的天气预报
    if (future) {
      const output: ComponentOutputType = {
        type: "component",
        component: defineAsyncComponent(() => import("./futureWeatherBox.vue")),
        props: {
          city,
        },
      };
      terminal.writeResult(output);
      return;
    }
    // 如果不选择 future
    const output: ComponentOutputType = {
      type: "component",
      component: defineAsyncComponent(() => import("./nowWeatherBox.vue")),
      props: {
        city,
      },
    };
    terminal.writeResult(output);
    return;
  },
};

export default weatherCommand;

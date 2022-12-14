/*
 * @Description: 请填写文件简介
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-18 20:58:44
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-19 19:49:58
 */
import { CommandOptionType, CommandType } from "@/core/command";
import { defineAsyncComponent } from "vue";
import ComponentOutputType = Terminal.ComponentOutputType;

/**
 * @description: b站热门视频获取命令
 * @return {*}
 * @author: jlx
 */
const videoCommand: CommandType = {
  func: "video",
  name: "b站最新热门视频",
  alias: ["shipin", "movie"],
  desc: "视频分区代码: https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/video/video_zone.md",
  params: [],
  options: [
    {
      key: "kind",
      desc: "是否选择观看分区",
      alias: ["k"],
      type: "boolean",
    },
    {
      key: "rid",
      desc: "视频分区",
      alias: ["r"],
      type: "string",
    },
  ],
  collapsible: true,
  action(options, terminal) {
    let { rid, kind } = options;
    // 说明不选择分区，则直接呈现热门视频（不带分区）
    if (!kind) {
      const output: ComponentOutputType = {
        type: "component",
        component: defineAsyncComponent(() => import("./videoBox.vue")),
      };
      terminal.writeResult(output);
      return;
    }
    // 输入了rid参数
    if (rid.startsWith("=")) rid = rid.replace("=", "");
    if (rid === "") {
      terminal.writeTextErrorResult("视频分区id不能为空！");
      return;
    }
    rid = parseInt(rid);
    if (isNaN(rid)) {
      terminal.writeTextErrorResult("请求参数不合法!");
      return;
    }
    // 呈现 热门分区视频
    const output: ComponentOutputType = {
      type: "component",
      component: defineAsyncComponent(() => import("./videoHotBox.vue")),
      props: {
        rid,
      },
    };
    terminal.writeResult(output);
    return;
  },
};

export default videoCommand;

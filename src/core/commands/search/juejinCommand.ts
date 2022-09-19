/*
 * @Description: 掘金搜索 关键词
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-15 16:24:26
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-19 20:53:56
 */

import { CommandType } from "@/core/command";

/**
 * @description:  掘金 搜索关键词
 * @return {*}
 * @author: jlx
 */
const juejinCommand: CommandType = {
  func: "juejin",
  name: "掘金搜索关键词",
  alias: ["jue", "jin"],
  params: [
    {
      key: "word",
      desc: "搜索内容",
      required: true,
    },
  ],
  options: [],
  action(options, terminal) {
    const { _ } = options;
    const word = _.length > 0 ? _[0] : "";
    //  https://juejin.cn/search?query=
    let targetLink = `https://juejin.cn/search?query=${word}`;
    window.open(targetLink);
  },
};

export default juejinCommand;

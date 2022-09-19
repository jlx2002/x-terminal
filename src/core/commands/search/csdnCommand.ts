/*
 * @Description:   csdn 开发者社区搜索
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-15 16:22:45
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-19 20:53:16
 */

import { CommandType } from "@/core/command";

/**
 * @description:  csdn 搜索关键词
 * @return {*}
 * @author: jlx
 */
const csdnCommand: CommandType = {
  func: "csdn",
  name: "csdn搜索",
  alias: ["csdn", "cs"],
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
    // https://so.csdn.net/so/search?q=
    let targetLink = `https://so.csdn.net/so/search?q=${word}`;

    window.open(targetLink);
  },
};

export default csdnCommand;

/*
 * @Description: 谷歌搜索关键词
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-15 16:22:53
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-15 16:58:24
 */

import { CommandType } from "../../command";

/**
 * @description:  谷歌 搜索关键词
 * @return {*}
 * @author: jlx
 */
const googleCommand: CommandType = {
  func: "google",
  name: "谷歌搜索关键词",
  alias: ["chorme"],
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
    //  https://www.google.com/search?q=
    let targetLink = `https://www.google.com/search?q=${word}`;
    window.open(targetLink);
  },
};

export default googleCommand;

/*
 * @Description: 知乎搜索 关键词
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-15 16:25:03
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-15 16:55:12
 */

import { CommandType } from "../../command";

/**
 * @description:  知乎 搜索关键词
 * @return {*}
 * @author: jlx
 */
const zhihuCommand: CommandType = {
  func: "zhihu",
  name: "知乎搜索关键词",
  alias: ["bhu"],
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
    // https://www.zhihu.com/search?type=content&q=
    let targetLink = `https://www.zhihu.com/search?type=content&q=${word}`;
    window.open(targetLink);
  },
};

export default zhihuCommand;

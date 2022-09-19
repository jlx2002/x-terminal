/*
 * @Description: 豆瓣搜索
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-15 16:25:25
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-19 20:53:20
 */

import { CommandType } from "@/core/command";

/**
 * @description:  豆瓣 搜索关键词
 * @return {*}
 * @author: jlx
 */
const doubanCommand: CommandType = {
  func: "douban",
  name: "豆瓣搜索关键词",
  alias: [],
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
    // https://www.douban.com/search?q=
    let targetLink = `https://www.douban.com/search?q=${word}`;

    window.open(targetLink);
  },
};

export default doubanCommand;

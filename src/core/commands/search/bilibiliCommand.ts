/*
 * @Description: 哔哩哔哩搜索关键词
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-16 10:55:57
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-16 15:08:13
 */
import { CommandType } from "../../command";

/**
 * @description:  bilibili 搜索关键词
 * @return {*}
 * @author: jlx
 */
const bilibiliCommand: CommandType = {
  func: "bilibili",
  name: "bilibili搜索",
  alias: ["bili"],
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
    // https://search.bilibili.com/all?keyword=
    let targetLink = `https://search.bilibili.com/all?keyword=${word}`;

    window.open(targetLink);
  },
};

export default bilibiliCommand;

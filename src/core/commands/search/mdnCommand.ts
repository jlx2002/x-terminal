/*
 * @Description: mdn 搜索关键词
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-14 22:31:34
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-19 20:53:59
 */
import { CommandType } from "@/core/command";

/**
 * @description: mdn 中文文档搜索关键词
 * @return {*}
 * @author: jlx
 */
const mdnCommand: CommandType = {
  func: "mdn",
  name: "mdn文档查询关键词",
  alias: ["mdn", "mozillamdn"],
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
    // https://developer.mozilla.org/zh-CN/search?q=json.stringfy&sort=best
    let targetLink = `https://developer.mozilla.org/zh-CN/search?q=${word}`;
    window.open(targetLink);
  },
};

export default mdnCommand;

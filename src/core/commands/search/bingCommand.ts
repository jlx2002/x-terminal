/*
 * @Description: bing 必应搜索关键词
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-14 21:53:18
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-19 20:53:07
 */
import { CommandType } from "@/core/command";

/**
 * @description:  必应搜索
 * @return {*}
 * @author: jlx
 */
const bingCommand: CommandType = {
  func: "bing",
  name: "必应搜索",
  alias: [],
  params: [
    {
      key: "word",
      desc: "搜索内容",
      required: true,
    },
  ],
  options: [
    {
      key: "picture",
      desc: "是否搜索图片",
      alias: ["p"],
      type: "boolean",
      defaultValue: false,
    },
  ],
  action(options, terminal) {
    const { _, picture } = options;
    const word = _.length > 0 ? _[0] : "";
    // https://cn.bing.com/search?q=b&FORM=HDRSC1
    let targetLink = `https://cn.bing.com/search?q=${word}`;
    // 搜索图片
    if (picture) {
      // https://cn.bing.com/images/search?q=b&form=HDRSC2&first=1&tsc=ImageHoverTitle
      targetLink = `https://cn.bing.com/images/search?q=${word}`;
    }
    window.open(targetLink);
  },
};

export default bingCommand;

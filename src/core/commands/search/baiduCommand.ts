/*
 * @Description: baidu 搜索
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-14 21:41:47
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-19 20:52:48
 */
import { CommandType } from "@/core/command";

/**
 * @description: 百度搜索命令
 * @return {*}
 * @author: jlx
 */
const baiduCommand: CommandType = {
  func: "baidu",
  name: "百度搜索",
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
    let targetLink = `https://www.baidu.com/s?wd=${word}`;
    // 搜索图片
    if (picture) {
      targetLink = `https://image.baidu.com/search/index?tn=baiduimage&word=${word}`;
    }
    window.open(targetLink);
  },
};

export default baiduCommand;

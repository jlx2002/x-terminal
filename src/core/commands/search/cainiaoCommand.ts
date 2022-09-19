/*
 * @Description: 菜鸟教程搜索关键词
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-14 22:42:17
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-19 20:53:12
 */
import { CommandType } from "@/core/command";

/**
 * @description: 菜鸟教程 搜索关键词
 * @return {*}
 * @author: jlx
 */
const cainiaoCommand: CommandType = {
  func: "cainiao",
  name: "菜鸟教程查询关键词",
  alias: ["rookie", "cai"],
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
    // https://www.runoob.com/?s=js
    let targetLink = `https://www.runoob.com/?s=${word}`;
    window.open(targetLink);
  },
};

export default cainiaoCommand;

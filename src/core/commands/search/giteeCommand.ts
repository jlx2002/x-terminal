/*
 * @Description: gitee 仓库搜索
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-14 21:59:03
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-19 20:53:25
 */

import { CommandType } from "@/core/command";

/**
 * @description: gitee 仓库搜索
 * @return {*}
 * @author: jlx
 */
const giteeCommand: CommandType = {
  func: "gitee",
  name: "Gitee搜索开源项目",
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
    // https://search.gitee.com/?type=repository&q=
    let targetLink = `https://search.gitee.com/?type=repository&q=${word}`;
    window.open(targetLink);
  },
};

export default giteeCommand;

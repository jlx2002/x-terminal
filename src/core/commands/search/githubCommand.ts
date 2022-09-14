/*
 * @Description: 请填写文件简介
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-14 21:58:53
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-14 22:34:01
 */
import { CommandType } from "../../command";

/**
 * @description: github 仓库搜索
 * @return {*}
 * @author: jlx
 */
const githubCommand: CommandType = {
  func: "github",
  name: "GitHub搜索开源项目仓库",
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
    // https://github.com/search?q=vue
    let targetLink = `https://github.com/search?q=${word}`;
    window.open(targetLink);
  },
};

export default githubCommand;
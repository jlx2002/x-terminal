/*
 * @Description: acwing 搜索题目
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-16 10:53:23
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-20 22:51:07
 */
import { CommandType } from "@/core/command";
import { getContestLink, getActivityLink } from "./calcAcwContest";

/**
 * @description: acwing 搜索命令
 * @return {*}
 * @author: jlx
 */
const acwingCommand: CommandType = {
  func: "acwing",
  name: "搜索题目,周赛入口",
  alias: ["acw"],
  params: [
    {
      key: "word",
      desc: "搜索内容",
      required: true,
    },
  ],
  options: [
    {
      key: "weekly",
      alias: ["w"],
      desc: "最新周赛入口",
      type: "boolean",
    },
    {
      key: "activity",
      alias: ["a"],
      desc: "活动入口",
      type: "boolean",
    },
  ],
  async action(options, terminal) {
    const { _, weekly, activity } = options;
    const word = _.length > 0 ? _[0] : "";
    let targetLink = "";
    // 如果 存在-w
    if (weekly) {
      // 返回合适的场数
      const entrance = await getContestLink();
      // console.log(entrance.data);
      targetLink = entrance.data;
    } else if (activity) {
      // 返回合适的活动入口链接
      const entrance = await getActivityLink(word);
      // 如果 入口链接为空
      if (!entrance.data) {
        terminal.writeTextErrorResult("活动关键词没有找到！");
        return;
      }
      targetLink = entrance.data;
    }
    // 没有 -w 和 -a的情况， 就搜索题目内容
    else {
      targetLink = `https://www.acwing.com/problem/search/1/?csrfmiddlewaretoken=1&search_content=${word}`;
    }
    window.open(targetLink);
  },
};

export default acwingCommand;

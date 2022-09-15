/*
 * @Description: 请填写文件简介
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-15 19:56:28
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-15 22:07:52
 */
import { CommandType } from "@/core/command";
import { calcBiWeekly, calcWeekly } from "./calcContest";

/**
 * @description: 力扣搜索命令
 * @return {*}
 * @author: jlx
 */
const leetcodeCommand: CommandType = {
  func: "leetcode",
  name: "搜索题目,周赛入口",
  alias: ["lc", "leet"],
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
      key: "biweekly",
      alias: ["b"],
      desc: "最新双周赛入口",
      type: "boolean",
    },
  ],
  action(options, terminal) {
    const { _, weekly, biweekly } = options;
    const word = _.length > 0 ? _[0] : "";
    let targetLink = "";
    // 如果 存在-w
    if (weekly) {
      // 返回合适的场数
      const entrance = calcWeekly();
      targetLink = `https://leetcode.cn/contest/weekly-contest-${entrance}`;
    }
    // 如果 存在-b
    else if (biweekly) {
      const entrance = calcBiWeekly();
      targetLink = `https://leetcode.cn/contest/biweekly-contest-${entrance}`;
    }
    // 没有 -w 和 -b的情况， 就搜索题目内容
    if (targetLink == "") {
      targetLink = `https://leetcode.cn/problemset/all/?search=${word}`;
    }
    window.open(targetLink);
  },
};

export default leetcodeCommand;

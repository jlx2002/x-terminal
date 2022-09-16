/*
 * @Description: 搜索命令 汇总
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-14 21:38:09
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-16 22:04:10
 */
import { CommandType } from "../../command";
import acwingCommand from "./acwing/acwingCommand";
import baiduCommand from "./baiduCommand";
import bilibiliCommand from "./bilibiliCommand";
import bingCommand from "./bingCommand";
import cainiaoCommand from "./cainiaoCommand";
import csdnCommand from "./csdnCommand";
import doubanCommand from "./doubanCommand";
import giteeCommand from "./giteeCommand";
import githubCommand from "./githubCommand";
import googleCommand from "./googleCommand";
import juejinCommand from "./juejinCommand";
import leetcodeCommand from "./leetcode/leetcodeCommand";
import mdnCommand from "./mdnCommand";
import zhihuCommand from "./zhihuCommand";

/**
 * @description: 搜索源
 * @return {*}
 * @author: jlx
 */
const fromDict: Record<string, CommandType> = {
  baidu: baiduCommand,
  bing: bingCommand,
  gitee: giteeCommand,
  github: githubCommand,
  csdn: csdnCommand,
  douban: doubanCommand,
  google: googleCommand,
  juejin: juejinCommand,
  zhihu: zhihuCommand,
  leetcode: leetcodeCommand,
  bilibili: bilibiliCommand,
  mdn: mdnCommand,
  cainiao: cainiaoCommand,
  acwing: acwingCommand,
};

/**
 * @description:  搜索search命令
 * @return {*}
 * @author: jlx
 */
const searchCommand: CommandType = {
  func: "search",
  name: "网页搜索",
  //
  alias: ["s", "sousuo", "sou", "query"],
  desc: "支持从不同平台快捷搜索内容",
  params: [
    {
      key: "word",
      desc: "搜索内容",
      required: true,
    },
  ],
  options: [
    {
      // 来源
      key: "from",
      alias: ["f"],
      type: "string",
      defaultValue: "baidu",
    },
  ],
  // 默认使用百度搜索
  action: (options, terminal) => {
    const { from = "baidu" } = options;
    // 执行不同搜索源的搜索方法
    const fromObj = fromDict[from];
    if (!fromObj) {
      terminal.writeTextErrorResult("找不到搜索源");
      return;
    }
    return fromObj.action(options, terminal);
  },
};

export default [searchCommand, ...Object.values(fromDict)];

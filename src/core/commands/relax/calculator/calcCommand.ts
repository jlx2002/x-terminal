/*
 * @Description: 计算器 命令
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-21 14:36:06
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-21 14:52:28
 */
import { CommandType } from "@/core/command";
import { calculate } from "./calculator";

/**
 * @description: 计算器命令
 * @return {*}
 * @author: jlx
 */
const calculatorCommand: CommandType = {
  func: "calculator",
  name: "计算器",
  desc: "计算简单四则运算表达式或者解一元一次方程",
  alias: ["calc", "eval"],
  params: [
    {
      key: "expression",
      desc: "计算表达式",
      required: true,
    },
  ],
  options: [
    {
      key: "equation",
      desc: "是否计算方程",
      alias: ["e"],
      type: "boolean",
    },
  ],
  action(options, terminal) {
    const { _, equation } = options;
    const expression = _.length > 0 ? _[0] : "";
    const res = calculate(expression);
    console.log(res);
    // 计算方程
    // if (equation) {

    // }
  },
};

export default calculatorCommand;

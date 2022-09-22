/*
 * @Description: 计算器 命令
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-21 14:36:06
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-22 08:27:42
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
  desc: "计算简单四则运算表达式",
  alias: ["calc", "eval"],
  params: [
    {
      key: "expression",
      desc: "计算表达式",
      required: true,
    },
  ],
  options: [],
  action(options, terminal) {
    const { _ } = options;
    const expression = _.length > 0 ? _[0] : "";
    const res: string = calculate(expression);
    console.log(res);
    terminal.writeTextSuccessResult(`计算结果是：${res}`);
  },
};

export default calculatorCommand;

/*
 * @Description: 请填写文件简介
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-21 14:36:17
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-21 14:47:31
 */

/**
 * @description:  简易计算器
 * @param {string} s 计算表达式
 * @return {*}
 * @author: jlx
 */
export const calculate = (s: string) => {
  const numStack = new Array();
  let lastOp: string = "+";
  let num = 0;

  for (let i = 0; i < s.length; i++) {
    if (!isNaN(Number(s[i])) && s[i] !== " ") {
      num = num * 10 + Number(s[i]);
    }
    if (isNaN(Number(s[i])) || i === s.length - 1) {
      switch (lastOp) {
        case "+": {
          numStack.push(num);
          break;
        }
        case "-": {
          numStack.push(-num);
          break;
        }
        case "*": {
          numStack.push(numStack.pop() * num);
          break;
        }
        case "/": {
          numStack.push(Math.trunc(numStack.pop() / num));
          break;
        }
      }
      lastOp = s[i];
      num = 0;
    }
  }

  return numStack.reduce((prev, curr) => prev + curr);
};

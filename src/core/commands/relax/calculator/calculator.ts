/*
 * @Description: 请填写文件简介
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-21 14:36:17
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-21 22:53:07
 */

export const calculate = function (s: string) {
  /*------------中缀表达式转后缀表达式---------------*/
  // st存放运算符的栈，post后缀表达式结果，n用于计算多位数字
  let st: any[] = [],
    post = [],
    n: any = -1;
  // 运算符优先级
  const level = (op: string) => {
    if (op === "+") return 1;
    if (op === "-") return 1;
    if (op === "*") return 2;
    if (op === "/") return 2;
  };
  for (let x of s) {
    // 数字考虑多位
    if (x >= "0" && x <= "9") {
      if (n >= 0) {
        n = n * 10 + +x;
      } else n = x;
    } else {
      // 数字入栈
      if (n >= 0) post.push(n), (n = -1);
      // 左括号直接入栈
      if (x == "(") {
        st.push(x);
      } else if (x == ")") {
        // 遇到右括号，将栈顶运算符弹出直到遇到(
        while (st[st.length - 1] != "(") post.push(st.pop());
        // 弹出左括号
        st.pop();
      } else {
        // 运算符操作  当前运算符优先级不大于栈顶的运算符优先级的话，弹出栈顶元素
        // @ts-ignore
        while (st.length && level(st[st.length - 1]) >= level(x))
          post.push(st.pop());
        // 当前运算符入栈
        st.push(x);
      }
    }
  }
  // 有剩余数字的话，放到表达式末尾
  if (n >= 0) post.push(n);
  // 栈中剩余运算符弹出
  while (st.length) post.push(st.pop());
  /*------------逆波兰表达式求解过程---------------*/
  const calc = (a: any, b: any, op: any) => {
    if (op == "+") return +a + +b;
    if (op == "-") return a - b;
    if (op == "*") return a * b;
    if (op == "/") return (a / b) | 0;
  };
  st.length = 0;
  for (let x of post) {
    if (!(x == "+" || x == "-" || x == "*" || x == "/")) st.push(x);
    else {
      // 弹出栈顶两个元素，先弹出的在符号右侧，后弹出的在符号左侧
      let b: any = st.pop(),
        a: any = st.pop();
      st.push(calc(a, b, x));
    }
  }
  return st[0];
};

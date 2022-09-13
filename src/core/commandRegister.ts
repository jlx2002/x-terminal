/*
 * @Description: 请填写文件简介
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-08 16:50:33
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-13 09:20:14
 */
import { CommandType } from "./command";
import helpCommand from "./commands/terminal/help/helpCommand";
// 命令列表
const commandList: CommandType[] = [helpCommand];

// 命令字典
const commandMap: Record<string, CommandType> = {};

// 遍历赋值
commandList.forEach((command) => {
  // 命令的名字为键， 命令为值
  commandMap[command.func] = command;
  command.alias?.forEach((name) => {
    // 命令的别名为键， 命令为值
    commandMap[name] = command;
  });
});

export { commandList, commandMap };

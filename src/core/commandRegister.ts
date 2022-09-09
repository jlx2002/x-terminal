/*
 * @Description: 请填写文件简介
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-08 16:50:33
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-09 16:23:27
 */
import { CommandType } from "./command";
import helpCommand from "./commands/terminal/help/helpCommand";
// 命令列表
const commandList: CommandType[] = [
    helpCommand,
];

// 命令字典
const commandMap: Record<string, CommandType> = {};

commandList.forEach((command) => {
    commandMap[command.func] = command;
    command.alias?.forEach((name) => {
        commandMap[name] = command;
    });
});

export { commandList, commandMap };

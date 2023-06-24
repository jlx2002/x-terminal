/*
 * @Description: 命令注册器
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-08 16:50:33
 * @LastEditors: jlx
 * @LastEditTime: 2023-06-22 22:18:29
 */
import { CommandType } from "./command";
import helpCommand from "./commands/terminal/help/helpCommand";
import searchCommands from "./commands/search/searchCommands";
import weatherCommand from "./commands/weather/weatherCommand";
import clearCommand from "./commands/terminal/clearCommand";
import translateCommand from "./commands/translate/translateCommand";
import dateCommand from "./commands/relax/dateCommand";
import articleCommand from "./commands/relax/article/articleCommand";
import musicCommand from "./commands/relax/netease/neteaseCommand";
import videoCommand from "./commands/relax/bilibili/videoCommand";
import chatCommand from "./commands/chat/chatCommand";
import backgroundCommand from "./commands/terminal/config/backgroundCommand";
import resetCommand from "./commands/terminal/config/resetCommand";
import welcomeCommand from "./commands/terminal/config/welcomeCommand";
import hintCommand from "./commands/terminal/config/hintCommand";
import infoCommand from "./commands/terminal/info/infoCommand";
import shortcutCommand from "./commands/terminal/shortcut/shortcutCommand";
import userCommands from "./commands/user/userCommands";
import calculatorCommand from "./commands/relax/calculator/calcCommand";
import showCommand from "./commands/bookmark/show/showCommand";
import addCommand from "./commands/bookmark/addCommand";
import { useUserStore } from "@/store/userStore";
import removeCommand from "./commands/bookmark/removeCommand";

// 获取 store
const store = useUserStore();

// 命令列表
const commandList: CommandType[] = [
  helpCommand,
  ...searchCommands,
  ...userCommands,
  weatherCommand,
  clearCommand,
  translateCommand,
  dateCommand,
  articleCommand,
  musicCommand,
  videoCommand,
  chatCommand,
  backgroundCommand,
  resetCommand,
  welcomeCommand,
  hintCommand,
  infoCommand,
  shortcutCommand,
  calculatorCommand,
  showCommand,
  addCommand,
  removeCommand,
  ...store.bookmarkCommands,
];

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

/*
 * @Description: 请填写文件简介
 * @Autor: jlx
 * @Date: 2023-06-20 22:28:56
 * @LastEditors: jlx
 */
import { CommandOptionType, CommandType } from "@/core/command";
import { defineAsyncComponent } from "vue";
import ComponentOutputType = Terminal.ComponentOutputType;

/**
 * @description: chat命令
 * @return {*}
 * @author: jlx
 */
const chatCommand: CommandType = {
  func: "chat",
  name: "chatgpt3.5 智能对话",
  alias: ["gpt"],
  params: [
    {
      key: "message",
      desc: "对话内容",
      required: true,
    },
  ],
  options: [
    {
      key: "role",
      desc: " 对话角色 role 可选：english 英文翻译; sql SQL终端机; lang 语言检测机; command 命令提示机",
      alias: ["r"],
      type: "string",
      defaultValue: "default",
    },
  ],
  collapsible: true,
  action(options, terminal) {
    let { _, role } = options;
    const message = _.length > 0 ? _[0] : "";
    // 验证key
    const key = localStorage.getItem('openai_key');
    if(!key || !key.startsWith('sk')){
      terminal.writeTextErrorResult('密钥错误！');
      return ;
    }
    // 如果 提示语为空
    if (message == "") {
      terminal.writeTextErrorResult("提示语不能为空！");
      return;
    }
    // 如果 role 前面有=
    if (role.startsWith("=")) role = role.replace("=", "");
    // 输出组件
    const output: ComponentOutputType = {
      type: "component",
      component: defineAsyncComponent(() => import("./chatAnswerBox.vue")),
      props: {
        role,
        message,
      },
    };
    terminal.writeResult(output);
    return;
  },
};

export default chatCommand;

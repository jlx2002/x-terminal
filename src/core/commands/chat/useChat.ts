/*
 * @Description: 请填写文件简介
 * @Autor: jlx
 * @Date: 2023-06-22 22:17:50
 * @LastEditors: jlx
 */
import { ref, Ref } from "vue";
import { chatRoleData, chatRoles, chatDefaultConfig } from "./chatRoleData";
import axios from "axios";
import { message } from "ant-design-vue";


interface useChatParams {
  answer: Ref<string>;
}

interface useChat {
  // 匹配字符串
  matchStr: (str: string) => string;
  // 获取数据
  getChatAnswer: (msg: string, role: string) => void;
}

export default function (useChatParam: useChatParams): useChat {
  const url = "https://api.zutjlx.site/proxy/api.openai.com/v1/chat/completions";
  let controller = new AbortController();
  const { answer } = useChatParam;

  /**
   * @description: 获取role 对应的config
   * @param {string} role
   * @return {*}
   * @author: jlx
   */
  const getRoleConfig = (role: string): chatConfig => {
    if (!chatRoles.includes(role)) {
      role = "default";
    }
    for (const chat of chatRoleData) {
      if (chat.name == role) {
        return chat;
      }
    }
    return chatDefaultConfig;
  };
  /**
   * @description: 保存chat历史记录
   * @param {string} content
   * @return {*}
   * @author: jlx
   */
  const setChatHistory = (content: string) => {
    if (!localStorage.getItem(`chatConfig`)) {
      localStorage["chatConfig"] = JSON.stringify([
        {
          role: "assistant",
          content: content,
        },
      ]);
      return;
    }
    const historyArray = JSON.parse(
      localStorage.getItem("chatConfig") as string
    ) as chatMessageConfig[];
    if (historyArray.length >= 3) {
      historyArray.pop();
    }
    historyArray.push({
      role: "assistant",
      content: content,
    });
    localStorage["chatConfig"] = JSON.stringify(historyArray);
  };
  /**
   * @description: 获取chat历史记录
   * @return {*}
   * @author: jlx
   */
  const getChatHistory = () => {
    if (!localStorage.getItem("chatConfig")) {
      return [];
    }
    return JSON.parse(localStorage["chatConfig"]);
  };
  /**
   * @description: 匹配字符串
   * @param {string} str
   * @return {*}
   * @author: jlx
   */
  const matchStr = (str: string) => {
    const regex = /"content":\s*"(.*)"}/;
    const matchResult = str.match(regex);
    if (matchResult) {
      let content = matchResult[1];
      while (content.includes("\\n")) {
        content = content.replace("\\n", " \n ");
      }
      if (content.includes("```")) content = content.replace("```", "``` ");
      return content;
    }
    return "";
  };

  /**
   * @description: 获取chat交流数据
   * @param {string} msg
   * @param {string} role
   * @return {*}
   * @author: jlx
   */
  const getChatAnswer = (msg: string, role: string) => {
    const roleConfig = getRoleConfig(role);
    const historyConfig = getChatHistory();
    roleConfig.messages = [
      ...roleConfig.messages,
      ...historyConfig,
      { role: "user", content: msg },
    ];
    const { name, description, ...reqConfig } = roleConfig;
    axios({
      method: "post",
      url,
      data: reqConfig,
      headers: {
        Authorization:
          "Bearer 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",
        // "Content-Type": "text/event-stream",
      },
      onDownloadProgress: function (progressEvent: any) {
        const tt = progressEvent.event.currentTarget.responseText;
        const strs = tt.split("\n");
        let res = "";
        for (const st of strs) {
          if (st) {
            res += matchStr(st);
          }
        }
        answer.value = res;
      },
      signal: controller.signal,
    })
      .catch((err) => {
        console.error("请求失败！");
        message.error(err);
      })
      .finally(() => {
        if(answer.value != ''){
            setChatHistory(answer.value);
        }
        
      });
  };

  return {
    matchStr,
    getChatAnswer,
  };
}

/*
 * @Description: 翻译 translate 命令
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-17 21:30:25
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-18 09:53:13
 */
import { getTranslateAns } from "@/api/translateApi";
import { CommandType } from "@/core/command";

/**
 * @description: 翻译 translate 命令
 * @return {*}
 * @author: jlx
 */
const translateCommand: CommandType = {
  func: "translate",
  name: "翻译",
  alias: ["fanyi", "fan", "zh-cn"],
  params: [
    {
      key: "sentence",
      desc: "翻译内容",
      required: true,
    },
  ],
  options: [],
  async action(options, terminal) {
    const { _ } = options;
    const sentence = _.length > 0 ? _[0] : "";
    // 如果 城市为空
    if (sentence == "") {
      terminal.writeTextErrorResult("翻译内容不能为空！");
      return;
    }
    const result = await getTranslateAns(sentence);
    if (result.data.code === 200) {
      terminal.writeTextSuccessResult(
        `${sentence}的翻译结果为： ${result.data.tst}`
      );
    } else {
      terminal.writeTextErrorResult("服务出现异常");
    }
  },
};

export default translateCommand;

/*
 * @Description: 请填写文件简介
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-18 17:01:53
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-19 20:11:13
 */
import { CommandType } from "@/core/command";
import { useTerminalConfigStore } from "@/store/config/terminalConfigStore";

/**
 * @description: welcome 修改欢迎词
 * @return {*}
 * @author: jlx
 */
const welcomeCommand: CommandType = {
  func: "welcome",
  name: "自定义终端欢迎语",
  alias: [],
  params: [
    {
      key: "texts",
      desc: "终端提示文本（支持多个值，不填则无欢迎语）",
      required: false,
    },
  ],
  options: [],
  async action(options, terminal) {
    const { _ } = options;
    let welcomeTexts = _;
    const { setWelcomeTexts } = useTerminalConfigStore();
    setWelcomeTexts(welcomeTexts);
  },
};

export default welcomeCommand;

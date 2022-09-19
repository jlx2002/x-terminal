/*
 * @Description: 请填写文件简介
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-18 16:27:44
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-19 17:37:04
 */
import { CommandType } from "@/core/command";
import { getBackgroundRandom } from "@/api/bgApi";
import { useTerminalConfigStore } from "@/store/config/terminalConfigStore";

/**
 * @description: 背景图片切换
 * @return {*}
 * @author: jlx
 */
const backgroundCommand: CommandType = {
  func: "background",
  name: "切换终端背景",
  alias: ["bg"],
  params: [
    {
      key: "url",
      desc: "图片地址（不填则随机）",
      required: false,
    },
  ],
  options: [],
  async action(options, terminal) {
    const { _ } = options;
    let url = _[0];
    if (_.length > 0) {
      url = _[0];
    }
    const { setBackground } = useTerminalConfigStore();
    // 如果url 地址为空
    if (!url) {
      // 随机获取壁纸
      const res = await getBackgroundRandom();
      setBackground(res.data);
    }
    setBackground(url);
  },
};

export default backgroundCommand;

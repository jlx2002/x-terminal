/*
 * @Description: 终端设置 数据仓库
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-17 16:56:09
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-19 20:06:19
 */
import { defineStore } from "pinia";

/**
 * @description: 终端配置状态存储
 * @return {*}
 * @author: jlx
 */
export const useTerminalConfigStore = defineStore("terminalConfig", {
  state: () => ({
    // 背景
    background:
      "https://tva2.sinaimg.cn/large/9bd9b167gy1g4lizxwzlrj21hc0xcqv5.jpg",
    // 输入提示
    showHint: true,
    // 终端欢迎语
    welcomeTexts: [
      "Welcome to MyIndex, coolest browser index for geeks!",
    ] as string[],
  }),
  getters: {},
  // 持久化
  persist: {
    key: "terminal-config-store",
    storage: window.localStorage,
    beforeRestore: (context) => {
      console.log("load terminalConfigStore data start");
    },
    afterRestore: (context) => {
      console.log("load terminalConfigStore data end");
    },
  },
  actions: {
    setBackground(url: string) {
      if (!url) {
        return;
      }
      this.background = url;
    },
    /**
     * 设置或反转提示
     * @param hint
     * @return 修改后的提示开启 / 关闭状态
     */
    setOrToggleShowHint(hint?: string): boolean {
      // 反转提示
      if (!hint) {
        this.showHint = !this.showHint;
        return this.showHint;
      }
      // 设置提示
      if (hint === "on") {
        this.showHint = true;
      } else if (hint === "off") {
        this.showHint = false;
      }
      return this.showHint;
    },
    /**
     * 修改终端提示语
     * @param welcomeTexts
     */
    setWelcomeTexts(welcomeTexts: string[]) {
      this.welcomeTexts = welcomeTexts;
    },
    reset() {
      this.$reset();
    },
  },
});

/*
 * @Description: 请填写文件简介
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-17 16:55:44
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-22 19:45:27
 */
import { defineStore } from "pinia";
import { getBookmarkList, getLoginUser } from "@/api/userApi";
import { LOCAL_USER } from "@/core/commands/user/userConstant";
import UserType = User.UserType;
import bookmark = Bookmark.bookmarkType;
import { CommandType } from "@/core/command";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      loginUser: {
        ...LOCAL_USER,
      },
      token: "",
      bookmarkList: new Array<bookmark>(),
    };
  },
  getters: {
    bookmarkCommands(state) {
      // 定义命令列表
      let commandsList: CommandType[] = [];
      // 遍历赋值
      for (let bookmark of state.bookmarkList) {
        let command: CommandType = {
          func: bookmark.keys,
          name: bookmark.url,
          desc: bookmark.desc,
          alias: [bookmark.nickname || ""],
          params: [],
          options: [],
          action(options, terminal) {
            let targetLink = bookmark.url;
            window.open(targetLink);
          },
        };
        commandsList.push(command);
      }
      return commandsList;
    },
  },
  // 持久化
  persist: {
    key: "user-store",
    storage: window.localStorage,
    beforeRestore: (context) => {
      console.log("load userStore data start");
    },
    afterRestore: (context) => {
      console.log("load userStore data end");
    },
  },
  actions: {
    async getAndSetLoginUser() {
      if (this.token != "") {
        const res: any = await getLoginUser(this.token);
        if (res?.code === 0 && res.data) {
          this.loginUser = res.data.user;
          // 获取 书签列表
          const result: any = await getBookmarkList(this.token);
          if (result?.code === 0) {
            // 书签列表赋值操作
            this.bookmarkList = result.data;
          } else {
            console.error("书签获取失败");
          }
        } else {
          console.log("token已经过期，请重新登录！");
          this.$reset();
        }
      } else {
        console.log("登录失败");
        this.$reset();
      }
    },
    setLoginUser(user: UserType, token: string) {
      this.loginUser = user;
      this.token = token;
    },
  },
});

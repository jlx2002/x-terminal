/*
 * @Description: 请填写文件简介
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-21 15:17:42
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-21 19:25:12
 */
declare namespace Bookmark {
  // 定义书签类型约束
  interface bookmarkType {
    // 命令名称
    keys: string;
    // 书签的url地址
    url: string;
    // 别名
    nickname?: string;
    // 介绍
    desc?: string;
  }
}

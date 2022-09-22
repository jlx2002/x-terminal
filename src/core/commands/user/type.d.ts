/*
 * @Description: 请填写文件简介
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-08 09:24:34
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-22 19:50:54
 */
declare namespace User {
  /**
   * 用户类型
   */
  interface UserType {
    id: number;
    username: string;
    email?: string;
    createTime?: date;
    updateTime?: date;
  }
}

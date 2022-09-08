/*
 * @Description: 请填写文件简介
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-08 09:24:34
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-08 09:28:19
 */
declare namespace User {
    /**
     * 用户类型
     */
    interface UserType {
        username: string;
        email?: string;
        createTime?: date;
        updateTime?: date;
    }
}

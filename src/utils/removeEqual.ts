/*
 * @Description: 替换掉等号
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-21 10:58:39
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-21 10:59:40
 */
/**
 * @description: 替换掉等号
 * @param {string} str
 * @return {*}
 * @author: jlx
 */
export const replaceEqual = (str: string) => {
  if (str.startsWith("=")) str = str.replace("=", "");
  return str;
};

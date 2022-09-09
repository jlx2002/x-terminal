/*
 * @Description: 请填写文件简介
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-09 17:10:42
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-09 21:42:57
 */
/**
 * 匹配网址正则
 */
const URL_REG =
  /(((https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

/**
 * 识别文本中的超链接
 * @param text
 */
const smartText = (text?: string) => {
  if (!text) {
    return text;
  }
  const reg = new RegExp(URL_REG, "gi");
  return text.replaceAll(reg, "<a href='$1' target='_blank'>$1</a>");
};

export default smartText;

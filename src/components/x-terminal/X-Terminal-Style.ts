/*
 * @Description: 请填写文件简介
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-09 10:56:29
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-09 10:58:46
 */
import { computed, StyleValue } from "vue";
// 终端主要样式，可以换成接收 height
export const mainStyle = computed(() => {
    const fullScreenStyle: StyleValue = {
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    };
    return fullScreenStyle;
});
// 终端包装类主样式
export const wrapperStyle = computed(() => {
    const background =
        "https://tva2.sinaimg.cn/large/9bd9b167gy1g4lizxwzlrj21hc0xcqv5.jpg";
    const style = {
        ...mainStyle.value,
    };
    if (background.startsWith("http")) {
        style.background = `url(${background})`;
    } else {
        style.background = background;
    }
    return style;
});
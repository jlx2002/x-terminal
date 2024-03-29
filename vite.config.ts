/*
 * @Description: 请填写文件简介
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-07 19:51:34
 * @LastEditors: jlx
 * @LastEditTime: 2023-06-24 22:14:17
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    //设置路径别名
    alias: {
      "@": resolve(__dirname, "src"),
      "*": resolve(""),
    },
  },
  plugins: [
    vue(),
    Components({
      resolvers: [AntDesignVueResolver()],
    }),
  ],
  // server:{
  //   proxy: {
  //     '/apis': {
  //       target: 'https://abc.zutjlx.site/api',	//实际请求地址
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/apis/, '')
  //     },
  //   }
  // }
});

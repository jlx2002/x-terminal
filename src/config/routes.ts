/*
 * @Description: 请填写文件简介
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-07 20:12:46
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-19 20:48:09
 */

import { createRouter, createWebHistory } from "vue-router";

const router: any = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "index",
      path: "/",
      component: () => import("@/views/IndexPage.vue"),
    },
  ],
});

export default router;

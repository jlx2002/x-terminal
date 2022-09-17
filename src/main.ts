/*
 * @Description: 请填写文件简介
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-07 19:51:34
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-17 17:25:55
 */
import { createApp } from "vue";
import router from "./config/routes";
import App from "@/App.vue";
import { createPinia } from "pinia";
import "ant-design-vue/dist/antd.css";
import Antd from "ant-design-vue";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const app = createApp(App);

// 状态管理
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(Antd);
app.use(pinia);
app.use(router);
app.mount("#app");

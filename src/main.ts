/*
 * @Description: 请填写文件简介
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-07 19:51:34
 * @LastEditors: jlx
 * @LastEditTime: 2023-06-22 22:38:38
 */
import { createApp } from "vue";
import router from "./config/routes";
import App from "@/App.vue";
// @ts-ignore
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
// @ts-ignore
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import Prism from 'prismjs';
import { createPinia } from "pinia";
import "ant-design-vue/dist/antd.css";
import Antd from "ant-design-vue";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";


const app = createApp(App);

VMdPreview.use(vuepressTheme, {
    Prism
});

// 状态管理
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(Antd);
app.use(pinia);
app.use(router);
app.use(VMdPreview);
app.mount("#app");

import { createApp } from 'vue'
import router from './config/routes';
import App from '@/App.vue'
import { createPinia } from "pinia";
import 'ant-design-vue/dist/antd.css';
import Antd from 'ant-design-vue';

const app = createApp(App);

// 状态管理
const pinia = createPinia();

app.use(Antd);
app.use(pinia);
app.use(router)
app.mount('#app')

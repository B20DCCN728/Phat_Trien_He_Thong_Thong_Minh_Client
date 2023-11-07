import './assets/base.css';
// import VueRouter from 'vue-router';
import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import router from './router/index.js';

const app = createApp(App);

app.use(Antd);
app.use(router);
app.mount('#app');
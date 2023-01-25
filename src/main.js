import { createApp } from 'vue'
import App from '@/App.vue'

import axios from "axios";

import dayjs from "dayjs";
/**
 * dayjs 기본언어 ko 세팅
 * */
import 'dayjs/locale/ko';
dayjs.locale('ko');

import store from '@/store'
import router from '@/router'

const app = createApp(App);
app.provide('$axios', axios);

/**
 * 전역변수 화
 * this.$[alias]로 호출
 * */
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$dayjs = dayjs

app
    .use(store)
    .use(router)

app.mount('#app')
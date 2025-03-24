import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import pinia from '@/stores/index';
import 'virtual:svg-icons-register'
import '@/theme/index.scss'

// import svgIcon from '@/components/svgIcon/index.vue'    // svg组件

// createApp 接收根组件
const app = createApp(App)

// 不使用插件时普通的全局注册组件方式
// app.component('svgIcon', svgIcon)

// mount 将根组件将根组件渲染在接收的容器参数里
app.use(pinia).use(router).mount('#app')
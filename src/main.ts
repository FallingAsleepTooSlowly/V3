import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '@/router'
import 'virtual:svg-icons-register'

// import svgIcon from '@/components/svgIcon/index.vue'    // svg组件

// createApp 接收根组件
const app = createApp(App)

// 全局注册组件
// app.component('svgIcon', svgIcon)

// mount 将根组件将根组件渲染在接收的容器参数里
app.use(router).mount('#app')
/// <reference types="vite/client" />

// 解决找不到模块“virtual:svg-icons-register”的问题
declare module 'virtual:svg-icons-register'

// 解决无法找到模块“@/components/svgIcon/index.vue”的声明文件
declare module '*.vue'

// 以下同理
declare module 'nprogress'
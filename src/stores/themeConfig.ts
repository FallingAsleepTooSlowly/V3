import { defineStore } from "pinia";

// defineStore 第一个参数是第一无二的 id，用来连接 store 和 devtool，第二个参数可以是 Setup 函数或 Option 对象
export const useThemeConfig = defineStore('themeconfig', {
    state: () => ({
        themeConfig: {
            layout: 'defaults'
        }
    }),
    // 相当于组件中的 method，可用 this 访问整个 store 实例，同样也可以正常使用异步
    actions: {
        setThemeConfig(data: any) {
            this.themeConfig = data.themeConfig
        }
    }
})

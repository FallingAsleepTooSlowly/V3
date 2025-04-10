import { defineStore } from "pinia";

export const useRoutesList = defineStore('routesList', {
    state: () => ({
        // 登陆后保存的路由列表
        routesList: [] as Array<String>,
    }),
    actions: {
        /*
            Array<String> 等价于 String[]，都是声明数组类型，这里 String 是个类类型，即字符串对象
            Array<String> 等价于 string[]，都是声明数组类型，这里 string 是个基本类型，即基本字符串值
        */
        async setRoutesList(data: Array<String>) {
            this.routesList = data
        }
    }
})

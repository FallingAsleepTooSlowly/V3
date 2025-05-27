import { defineStore } from "pinia";

export const useIconList = defineStore('iconList', {
    state: () => ({
        // 按需加载的 icon
        iconList: {
            'IEpFold': IEpFold
        }
    }),
    actions: {
        // getIcon(str: any) {
        //     return this.iconList[str]
        // }
    }
})

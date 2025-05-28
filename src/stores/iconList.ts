import { defineStore } from "pinia";
// ---------------- 添加的图标
import IEpUser from "~icons/ep/user";

export const useIconList = defineStore('iconList', {
    state: () => ({
        // 按需加载的 icon
        iconList: {
            'IEpFold': IEpFold,
            'IEpUser': IEpUser
        }
    }),
    actions: {
        // getIcon(str: any) {
        //     return this.iconList[str]
        // }
    }
})

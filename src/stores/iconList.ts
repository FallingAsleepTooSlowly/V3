import { defineStore } from "pinia";
// ---------------- 添加的图标
import IEpUser from "~icons/ep/user";
import IEpHouse from "~icons/ep/house";

export const useIconList = defineStore('iconList', {
    state: () => ({
        // 按需加载的 icon
        iconList: {
            'IEpHouse': IEpHouse,
            'IEpUser': IEpUser
        }
    }),
    actions: {
        getIcon(str) {
            return this.iconList[str]
        }
    }
})

import { defineStore } from "pinia";
// ---------------- 添加的图标
import IEpUser from "~icons/ep/user";
import IEpHouse from "~icons/ep/house";
import IEpDocument from "~icons/ep/document";
import IEpKey from "~icons/ep/key";
import UEpFiles from "~icons/ep/Files";

export const useIconList = defineStore('iconList', {
    state: () => ({
        // 按需加载的 icon
        iconList: {
            'IEpHouse': IEpHouse,
            'IEpUser': IEpUser,
            'IEpDocument': IEpDocument,
            'IEpKey': IEpKey,
            'UEpFiles': UEpFiles
        }
    }),
    actions: {
        getIcon(str) {
            return this.iconList[str]
        }
    }
})

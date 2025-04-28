import { defineStore } from "pinia";
import { Session } from '@/utils/storage';

/**
 * TagsView 路由列表
*/
export const useTagsViewRoutes = defineStore('tagsViewRoutes', {
    state: (): TagsViewRoutesState => ({
        // 已打开的 tag 路由
        tagsViewRoutes: [],
        // 开启/关闭全屏时的 boolean 状态
		isTagsViewCurrenFull: false,
    }),
    actions: {
        // 保存已打开的 tag 路由
        async setTagsViewRoutes(data: Array<string>) {
			this.tagsViewRoutes = data;
        },
        // 保存开启/关闭全屏时的 boolean 状态
		setCurrenFullscreen(bool: Boolean) {
			Session.set('isTagsViewCurrenFull', bool);
			this.isTagsViewCurrenFull = bool;
		},
    }
})

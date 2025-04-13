/*前端控制路由*/

import type { RouteRecordRaw } from 'vue-router'
import { formatFlatteningRoutes, formatTwoStageRoutes } from '@/utils/tools'
import { dynamicRoutes, notFoundAndNoPower } from '@/router/routes'

/**
 * 前端控制路由：初始化方法，防止刷新时路由丢失
*/
export async function initFrontControlRoutes() {
    // 无 token 时停止执行下一步
    if (!window.localStorage.getItem('token')) return
    // 添加动态路由
    await setAddRoute()
}

/**
 * 遍历添加筛选后的动态路由
*/
export async function setAddRoute() {
    // await setFilterRouteEnd().forEach((route: RouteRecordRaw) => {

    // })
}

/**
 * 获取有当前用户权限标识的路由数组，进行对原路由的替换
 * @return 返回替换后的路由数组
*/
export async function setFilterRouteEnd() {
    let filterRouteEnd: Array<any> = formatTwoStageRoutes(formatFlatteningRoutes(dynamicRoutes))
    // notFoundAndNoPower 防止 404、401 不在 layout 布局中，不设置的话，404、401 界面将全屏显示
    // 关联问题 No match found for location with path 'xxx'
    filterRouteEnd[0].children = [...setFilterRoute(filterRouteEnd[0].children), ...notFoundAndNoPower]
    return filterRouteEnd
}

/**
 * 获取当前用户权限标识去比对路由表（只处理单级路由，未处理成多级嵌套路由）
*/
export function setFilterRoute(chil: any) {
    // const stores = useUserInfo();
	// const { userInfos } = storeToRefs(stores);
	// let filterRoute: any = [];
	// chil.forEach((route: any) => {
	// 	if (route.meta.roles) {
	// 		route.meta.roles.forEach((metaRoles: any) => {
	// 			userInfos.value.roles.forEach((roles: any) => {
	// 				if (metaRoles === roles) filterRoute.push({ ...route });
	// 			})
	// 		})
	// 	}
    // })
    return chil
}

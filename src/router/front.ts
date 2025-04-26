/*前端控制路由*/

import type { RouteRecordRaw } from 'vue-router'
import { formatFlatteningRoutes, formatTwoStageRoutes } from '@/utils/tools'
import { dynamicRoutes, notFoundAndNoPower } from '@/router/routes'
import { router } from '@/router/index'
import { useRoutesList } from '@/stores/routesList'
import { Session } from '@/utils/storage';

/**
 * 前端控制路由：初始化方法，防止刷新时路由丢失
*/
export async function initFrontControlRoutes() {
    // 无 token 时停止执行下一步
    if (!Session.get('token')) return
    // 1 添加动态路由
    await setAddRoute()
    // 2 设置递归过滤有权限的路由到 pinia routesList 中（已处理成多级嵌套路由）及缓存多级嵌套数组处理后的一维数组
    setFilterMenuAndCacheTagsViewRoutes()
}

/**
 * 1.1 遍历添加筛选后的动态路由
*/
export async function setAddRoute() {
    let filterRouteEnd = await setFilterRouteEnd()
    await filterRouteEnd.forEach((route: RouteRecordRaw) => {
        router.addRoute(route)
    })
}

/**
 * 1.2 获取有当前用户权限标识的路由数组，进行对原路由的替换
 * @return 返回替换后的路由数组
*/
export async function setFilterRouteEnd() {
    let filterRouteEnd: any = formatTwoStageRoutes(formatFlatteningRoutes(dynamicRoutes))
    // notFoundAndNoPower 防止 404、401 不在 layout 布局中，不设置的话，404、401 界面将全屏显示
    // 关联问题 No match found for location with path 'xxx'
    filterRouteEnd[0].children = [...setFilterRoute(filterRouteEnd[0].children), ...notFoundAndNoPower]
    return filterRouteEnd
}

/**
 * 1.3 获取当前用户权限标识去比对路由表（只处理单级路由，未处理成多级嵌套路由）
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
/**
 * 2.1 设置递归过滤有权限的路由到 pinia routesList 中（已处理成多级嵌套路由）及缓存多级嵌套数组处理后的一维数组
*/
export function setFilterMenuAndCacheTagsViewRoutes() {
    const storesRoutesList = useRoutesList()
    // storesRoutesList.setRoutesList(dynamicRoutes[0].children as any)
    storesRoutesList.setRoutesList([...dynamicRoutes[0].children as any, ...notFoundAndNoPower])
}

/*前端控制路由*/

import type { RouteRecordRaw } from 'vue-router'
import { storeToRefs } from 'pinia'
import { formatFlatteningRoutes, formatTwoStageRoutes } from '@/utils/tools'
import { dynamicRoutes, notFoundAndNoPower } from '@/router/routes'
import { router } from '@/router/index'
import { useRoutesList } from '@/stores/routesList'
import { Session } from '@/utils/storage'
import { useUserInfo } from '@/stores/userInfo'
import { useTagsViewRoutes } from '@/stores/tagsViewRoutes'

/**
 * 前端控制路由：初始化方法，防止刷新时路由丢失（用户登陆和路由跳转但无显示的路由列表时调用）
*/
export async function initFrontControlRoutes() {
    // 无 token 时停止执行下一步
    if (!Session.get('token')) return false
    // 将用户信息保存到全局
    await useUserInfo().setUserInfo()
    // 登陆时调用需要判断当前用户是否有登陆权限
    let userInfo = JSON.parse(JSON.stringify(useUserInfo())).userInfo
    if (userInfo.roles.length <= 0) {
        return Promise.resolve(true)
    }
    // 1 添加动态路由到 vue-router 里
    await setAddRoute()
    // 2 设置递归过滤有权限的路由到 pinia routesList 中（已处理成多级嵌套路由）及缓存多级嵌套数组处理后的一维数组
    setFilterMenuAndCacheTagsViewRoutes()
}

/**
 * 1.1 遍历添加筛选后的动态路由
*/
export async function setAddRoute() {
    // 获取筛选后可以访问的路由
    let filterRouteEnd = await setFilterRouteEnd()
    await filterRouteEnd.forEach((route: RouteRecordRaw) => {
        router.addRoute(route)
    })
}

/**
 * 1.2 获取有当前用户权限标识的路由数组，进行对原路由的替换
 *     包含有权限的路由和 404 等页面
 * @return 返回替换后的路由数组
*/
export async function setFilterRouteEnd() {
    // 此处先把多级路由嵌套数组处理成一维数组，再将其处理成在路由 '/' 的 children 里的二级数组
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
    // 获取全局保存的用户信息
    const userInfo = storeToRefs(useUserInfo()).userInfo
    let filterRoutes: any = []
    // 筛选路由当前用户权限可以访问的路由
    chil.forEach((route: any) => {
        if (route.meta.roles) {
            route.meta.roles.forEach((metaRole: any) => {
                userInfo.value.roles.forEach((role: any) => {
                    if (metaRole === role) {
                        filterRoutes.push({ ...route })
                    }
                })
            })
        }
    })
    return filterRoutes
}

/**
 * 2.1 设置递归过滤有权限的路由到 pinia routesList 中（已处理成多级嵌套路由）及缓存多级嵌套数组处理后的一维数组
*/
export function setFilterMenuAndCacheTagsViewRoutes() {
    const storesRoutesList = useRoutesList()
    // 获取全局保存的用户信息
    const userInfo = storeToRefs(useUserInfo()).userInfo
    // 保存左侧菜单、横向菜单的展示
    storesRoutesList.setRoutesList(setFilterHasRolesMenu(dynamicRoutes[0].children, userInfo.value.roles))
    setCacheTagsViewRoutes()
}

/**
 * 2.2 拿当前用户权限标识去筛选有权限的路由（可处理多级嵌套路由）
*/
export function setFilterHasRolesMenu(routes: any, roles: any) {
    const menu: any = []
    routes.forEach((route: any) => {
        // 拷贝一份用于操作
        const item = { ...route }
        if (hasRoles(item, roles)) {
            // 递归判断筛选子路由的权限
            if (item.children)
                item.children = setFilterHasRolesMenu(item.children, roles)
            menu.push(item)
        }
    })
    return menu
}

/**
 * 2.3 判断当前路由 meta.roles 中是否包含当前登陆用户角色
*/
export function hasRoles(route: any, roles: any) {

    if (route.meta && route.meta.roles)
        return roles.some((role: any) => route.meta.roles.includes(role))
    else
        return true
}

/**
 * 2.4 缓存多级嵌套数组处理后的一维数组
 *     只包含有权限的路由，不包含 404 等
 *     (暂未使用)
*/
export function setCacheTagsViewRoutes() {
    // 获取用户信息
    const userInfo = storeToRefs(useUserInfo()).userInfo
    const storesTagsView = useTagsViewRoutes()
    // 筛选权限后的路由
    let rolesRoutes = setFilterHasRolesMenu(dynamicRoutes, userInfo.value.roles)
    // 添加有权限的路由到 setTagsViewRoutes 中
    storesTagsView.setTagsViewRoutes(formatTwoStageRoutes(formatFlatteningRoutes(rolesRoutes))[0].children)
}

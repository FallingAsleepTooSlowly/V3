/* 定义动态路由和静态路由 */

// RouteRecordRaw 是 vue-router 的类型，用于定义路由配置，它只是一个类型定义，并不会自动注册路由（不使用好像也行）
// 因为导入的是一个类型，所以要加 type 用于说明，不然会报错
import type { RouteRecordRaw } from 'vue-router';

/**
 * 定义动态路由
 */
export const dynamicRoutes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: '/',
        component: () => import("@/layout/index.vue"),
        meta: {
            isKeepAlive: true
        },
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import("@/views/home/index.vue"),
                meta: {}
            },
            {
                path: '/user',
                name: 'user',
                component: () => import("@/views/user/index.vue"),
                meta: {}
            }
        ]
    }
]

/**
 * 定义静态路由
 */
export const staticRoutes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'login',
        component: () => import("@/views/login/index.vue"),
        meta: {}
    }
]
// export default [
//     {
//         // 首页
//         path: '/',
//         component: () => import('../views/user/index.vue'),
//         children: []
//     },
//     {
//         // 登录
//         path: '/login',
//         name: 'login',
//         component: () => import('../views/login/index.vue'),
//         children: []
//     }
// ]

/**
 * 定义404、401界面
 */
export const notFoundAndNoPower: Array<RouteRecordRaw> = [
    // 将匹配所有内容并将其放在 `route.params.pathMatch` 下
    {
        // path: '/:pathMatch(.*)*',
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: () => import("@/views/error/404.vue"),
        // 路由的参数
        meta: {
			title: 'message.staticRoutes.notFound',
			isHide: true
		}
    },
    // // 将匹配以 `/user-` 开头的所有内容，并将其放在 `route.params.afterUser` 下
    // {
    //     path: '/user-:afterUser(.*)',
    //     component: () => import("@/views/error/401.vue")
    // },
    {
        path: '/401',
        name: 'NoPower',
        component: () => import("@/views/error/401.vue"),
        meta: {}
    },
]

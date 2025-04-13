/* 通用工具类集合 */

import { useKeepALiveNames } from "@/stores/keepAliveNames";

/**
 * 路由多级嵌套数组处理成一维数组
 * @param arr 传入路由菜单数据数组
 * @returns 返回处理后的一维路由菜单数组
 */
export function formatFlatteningRoutes(arr: any) {
	if (arr.length <= 0) return false;
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].children) {
			arr = arr.slice(0, i + 1).concat(arr[i].children, arr.slice(i + 1));
		}
	}
	return arr;
}

/**
 * 一维数组处理成多级嵌套数组（只保留二级：也就是二级以上全部处理成只有二级，keep-alive 支持二级缓存）
 * @description isKeepAlive 处理 `name` 值，进行缓存。顶级关闭，全部不缓存
 * @link 参考：https://v3.cn.vuejs.org/api/built-in-components.html#keep-alive
 * @param arr 处理后的一维路由菜单数组
 * @returns 返回将一维数组重新处理成 `定义动态路由（dynamicRoutes）` 的格式
 */
export function formatTwoStageRoutes(arr: any) {
	if (arr.length <= 0) return false;
	const newArr: any = [];
	const cacheList: Array<string> = [];
	arr.forEach((v: any) => {
		if (v.path === '/') {
			newArr.push({ component: v.component, name: v.name, path: v.path, redirect: v.redirect, meta: v.meta, children: [] });
		} else {
			// 判断是否是动态路由（xx/:id/:name），用于 tagsView 等中使用
			// 修复：https://gitee.com/lyt-top/vue-next-admin/issues/I3YX6G
			if (v.path.indexOf('/:') > -1) {
				v.meta['isDynamic'] = true;
				v.meta['isDynamicPath'] = v.path;
			}
			newArr[0].children.push({ ...v });
			// 存 name 值，keep-alive 中 include 使用，实现路由的缓存
			// 路径：/@/layout/routerView/parent.vue
			if (newArr[0].meta.isKeepAlive && v.meta.isKeepAlive) {
				cacheList.push(v.name);
				const stores = useKeepALiveNames();
				stores.setCacheKeepAlive(cacheList);
			}
		}
	});
	return newArr;
}

// 判断是否是数组
export function isArray (val: any): Boolean {
    return Object.prototype.toString.call(val) === '[object Array]'
}

// 判断是否是对象
export function isObject(val: any): Boolean {
    return Object.prototype.toString.call(val) === '[object Object]'
}

// 深拷贝
export function deepClone(obj: any): any {
	// 对象的深拷贝方法
	if (obj === null) return null
	if (typeof obj !== 'object') return obj
	if (obj.constructor === Date) return new Date(obj)
	if (obj.constructor === RegExp) return new RegExp(obj)
	var newObj = new obj.constructor()  //保持继承链
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			// 不遍历其原型链上的属性
			var val = obj[key]
			// newObj[key] = typeof val === 'object' ? arguments.callee(val) : val;     // 使用arguments.callee解除与函数名的耦合
			newObj[key] = typeof val === 'object' ? deepClone(val) : val    // 严格模式下使用匿名函数从而避免使用arguments.callee
		}
	}
	return newObj
}

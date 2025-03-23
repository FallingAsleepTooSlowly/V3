/* 通用工具类集合 */

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
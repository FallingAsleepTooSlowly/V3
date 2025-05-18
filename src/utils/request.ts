import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Session } from '@/utils/storage'

// 处理 类型“AxiosResponse<any, any>”上不存在属性“token” 的问题，即处理 typeScript 无法识别 Axios 响应对象中的自定义属性的问题
declare module 'axios' {
    interface AxiosInstance {
        (config: AxiosRequestConfig): Promise<any>
    }
}

// 创建一个 axios 实例
// 参数详见 https://www.axios-http.cn/docs/req_config
const axiosInstance: AxiosInstance = axios.create({
    // 用于请求服务器的 URL
    // url: '/user',
    // 创建请求时使用的方法，默认是 'get'，
    // method: 'post',
    // baseURL 将自动加在 url 前面，除非 url 是一个绝对 URL
    baseURL: 'http://localhost:9000',
    // 自定义请求头
    headers: { 'Content-Type': 'application/json' },
    // 请求超时的毫秒数，如果请求时间超过这个值，则请求会被中断
	timeout: 50000,
    // 跨域请求是否提供凭据信息(cookie、HTTP认证及客户端SSL证明等)，即请求为跨域类型时是否在请求中协带cookie
    withCredentials: true,
    // paramsSerializer 是可选方法，主要用于序列化 params
    // paramsSerializer: {
	// 	serialize(params) {
	// 		return qs.stringify(params, { allowDots: true });
	// 	},
    /*
        transformRequest 允许在向服务器发送前，修改请求数据
        它只能用于 PUT, POST 和 PATCH 这几个请求方法
        数组最后一个函数必须返回一个字符串，一个 BUFFER 实例，ArrayBuffer，FormData，或 Stream
        可以修改请求头
    */
    // transformRequest: [function (data, headers) {
    //     // 对发送的 data 进行任意转换处理

    //     return data;
    // }],+
    // transformResponse 在传递给 then/catch 前，允许修改响应数据
    // transformResponse: [function (data) {
    //     // 对接收的 data 进行任意转换处理

    //     return data;
    // }],
})

// 添加请求拦截器
axiosInstance.interceptors.request.use(
    (config) => {
		// 在发送请求之前做些什么 token
		// if (Session.get('token')) {
		// 	config.headers!['Authorization'] = `${Session.get('token')}`;
        // }
        if (Session.get('token')) {
            // ! 在 TS 中是非空断言操作符，表示此处的值可能是也可能不是 null/undefined
            config.headers!['token'] = Session.get('token')
        }
		return config;
	},
	(error) => {
		// 对请求错误做些什么
		return Promise.reject(error);
	}
);

// 添加响应拦截器
axiosInstance.interceptors.response.use(
	(response) => {
		// 对响应数据做点什么
		const res = response.data;
		if (res.code && res.code !== 0) {
			// `token` 过期或者账号已在别处登录
			if (res.code === 401 || res.code === 4001) {
				Session.clear(); // 清除浏览器全部临时缓存
				window.location.href = '/'; // 去登录页
				ElMessageBox.alert('你已被登出，请重新登录', '提示', {})
					.then(() => {})
					.catch(() => {});
            } else {
                ElMessage.error(res.message)
            }
			// return Promise.reject(axiosInstance.interceptors.response);
			return Promise.reject(res);
		} else {
			return res;
		}
	},
    (error) => {
		// 对响应错误做点什么
		if (error.message.indexOf('timeout') != -1) {
			ElMessage.error('网络超时');
		} else if (error.message == 'Network Error') {
			ElMessage.error('网络连接错误');
		} else {
			if (error.response.data) ElMessage.error(error.response.statusText);
			else ElMessage.error('接口路径找不到');
		}
		return Promise.reject(error);
	}
)

// 导出 axios 实例
export default axiosInstance;

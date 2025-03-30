import axios from 'axios'
import type { AxiosInstance } from 'axios'

// 创建一个 axios 实例
const axiosInstance: AxiosInstance = axios.create({
    // 用于请求服务器的 URL
    // url: '/user',
    // 创建请求时使用的方法，默认是 'get'，
    // method: 'post',
    // baseURL 将自动加在 url 前面，除非 url 是一个绝对 URL
    baseURL: 'http://localhost:9000',
    /*
        transformRequest 允许在向服务器发送前，修改请求数据
        它只能用于 PUT, POST 和 PATCH 这几个请求方法
        数组最后一个函数必须返回一个字符串，一个 BUFFER 实例，ArrayBuffer，FormData，或 Stream
        可以修改请求头
    */
    // transformRequest: [function (data, headers) {
    //     // 对发送的 data 进行任意转换处理
    
    //     return data;
    // }],
    // transformResponse 在传递给 then/catch 前，允许修改响应数据
    // transformResponse: [function (data) {
    //     // 对接收的 data 进行任意转换处理
    
    //     return data;
    // }],
    // 自定义请求头
    headers: { 'Content-Type': 'application/json' },
    // params 是与请求一起发送的 URL 参数，必须是一个简单对象或 URLSearchParams 对象
    // params: {
    //     ID: 12345
    // },
    // paramsSerializer 是可选方法，主要用于序列化 params
    // paramsSerializer: {
	// 	serialize(params) {
	// 		return qs.stringify(params, { allowDots: true });
	// 	},
	// },
    /*
        `data` 是作为请求体被发送的数据
        仅适用 'PUT', 'POST', 'DELETE 和 'PATCH' 请求方法
        在没有设置 `transformRequest` 时，则必须是以下类型之一:
        - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
        - 浏览器专属: FormData, File, Blob
        - Node 专属: Stream, Buffer
    */
    // data: {
    //     firstName: 'Fred'
    // },
})
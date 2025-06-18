import request from '@/utils/request'

const userApi = {
    // 登陆
    login: (data: object) => {
        return request({
            url: '/user/login',
            method: 'post',
            data
        })
    },
    // 校验 token
    checkToken: () => {
        return request({
            url: '/user/checkToken',
            method: 'get'
        })
    },
    // 获取验证码
    getSvg: () => {
        return request({
            url: '/user/getSvg',
            method: 'get'
        })
    },
    // 获取最新用户信息
    getUserInfoByUserName: (data: object) => {
        return request({
            url: '/user/getUserInfoByUserName',
            method: 'post',
            data
        })
    },
    userPost: (data: object) => {
        return request({
            url: '/user/post',
            method: 'post',
            data
        })
    }
}

export default userApi;

// export function userPostApi(data: object) {
//     return request({
//         url: '/user/post',
//         method: 'post',
//         data
//     })
// }

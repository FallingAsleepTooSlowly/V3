import { defineStore } from "pinia";
import userApi from '@/api/user';

/**
 * 用户信息
*/
export const useUserInfo = defineStore('userInfo', {
    state: () => ({
        userInfo: {
            // 用户名
            userName: '',
            // 角色
            roles: [],
            // 头像图片
            portrait: ''
        }
    }),
    actions: {
        async setUserInfo() {

        },
        // 调用接口获取用户信息
        async getApiUserInfo() {
            // return userApi.login({
            //     name: "ganhuan",
            //     password: "123456"
            // })
            return new Promise((resolve) => {
                const res = userApi.login({ name: "ganhuan", password: "123456" })
                resolve(res)
            })
        }
    }
})

import { defineStore } from "pinia";
import userApi from '@/api/user';
import { Session } from "@/utils/storage";

/**
 * 用户信息
*/
export const useUserInfo = defineStore('userInfo', {
    state: (): UserInfosState => ({
        userInfo: {
            // 用户名
            userName: '',
            // 角色
            roles: [] as Array<string>,
            // 头像图片
            portrait: ''
        }
    }),
    actions: {
        // 将用户信息保存到全局，若 token 校验通过但 session 内无用户信息则调用接口获取并保存
        async setUserInfo() {
            console.log('userInfo=====>', Session.get('userInfo'))
            // Session.remove('userInfo')
            // 存储用户信息到浏览器缓存
            if (Session.get('userInfo')) {
                this.userInfo = Session.get('userInfo')
            } else {
                const theUserInfo = <UserInfo>await this.getApiUserInfo()
                this.userInfo = theUserInfo
            }
        },
        // 调用接口获取用户信息
        async getApiUserInfo() {
            console.log('getApiUserInfogetApiUserInfo')
            // return userApi.login({
            //     name: "ganhuan",
            //     password: "123456"
            // })
            return new Promise((resolve) => {
                const res: any = userApi.login({ name: "ganhuan", password: "123456" })
                // let theUserInfo = {
                //     name: 'ganhuan',
                //     roles: ['admin'],
                //     // roles: ['common'],
                //     portrait: 'xxxxx'
                // }
                Session.set('userInfo', res.data)
                resolve(res)
            })
        }
    }
})

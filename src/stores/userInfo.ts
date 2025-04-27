import { defineStore } from "pinia";
import userApi from '@/api/user';
import { Session } from "@/utils/storage";

/**
 * 用户信息
*/
export const useUserInfo = defineStore('userInfo', {
    state: () => ({
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
        async setUserInfo() {
            console.log('userInfo=====>', Session.get('userInfo'))
            Session.remove('userInfo')
            // 存储用户信息到浏览器缓存
            if (Session.get('userInfo')) {
                this.userInfo = Session.get('userInfo')
            } else {
                const theUserInfo = <UserInfo>await this.getApiUserInfo()
                console.log('getApiUserInfo====>', theUserInfo)
                this.userInfo = theUserInfo
            }
        },
        // 调用接口获取用户信息
        async getApiUserInfo() {
            // return userApi.login({
            //     name: "ganhuan",
            //     password: "123456"
            // })
            return new Promise((resolve) => {
                const res = userApi.login({ name: "ganhuan", password: "123456" })
                let theUserInfo = {
                    name: 'ganhuan',
                    roles: ['admin'],
                    portrait: 'xxxxx'
                }
                Session.set('userInfo', theUserInfo)
                resolve(theUserInfo)
            })
        }
    }
})

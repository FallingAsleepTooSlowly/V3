/**
 * 类型定义
*/

// 用户信息
declare interface UserInfo<T = any> {
    userName: string,
    roles: string[],
    portrait: string
}

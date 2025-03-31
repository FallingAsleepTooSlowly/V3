import request from '@/utils/request'

// export function userApi() {
//     return {
//         userPost: (data: object) => {
//             return request({
//                 url: '/user/post',
//                 method: 'post',
//                 data
//             })
//         }
//     }
// }

export function userPostApi(data: object) {
    return request({
        url: '/user/post',
        method: 'post',
        data
    })
}

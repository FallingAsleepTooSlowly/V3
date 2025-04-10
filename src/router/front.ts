/*前端控制路由*/

export async function initFrontControlRoutes() {
    // 无 token 时停止执行下一步
    if (!window.localStorage.getItem('token')) return
}

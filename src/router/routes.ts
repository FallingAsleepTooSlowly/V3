// 创建路由
export default [
    {
        // 首页
        path: '/',
        component: () => import('../views/home/index.vue'),
        children: []
    },
    {
        // 登录
        path: '/login',
        name: 'login',
        component: () => import('../views/login/index.vue'),
        children: []
    }
]
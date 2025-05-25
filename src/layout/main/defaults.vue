<template>
    <el-container class="layout-container">
        <LayoutAside />
        <el-container class="h100" style="display: flex; flex-direction: column;">
            <el-scrollbar>
                <el-button type="success" @click="checkToken">校验token</el-button>
                <el-button type="danger" @click="logOut">退出登陆</el-button>
                <LayoutHeader />
                <LayoutMain />
            </el-scrollbar>
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
import userApi from '@/api/user';
import { useRoute, useRouter } from 'vue-router';
import { Session } from '@/utils/storage';

// ---------------- 引入组件
const LayoutAside = defineAsyncComponent(() => import('@/layout/components/aside.vue'))
const LayoutMain = defineAsyncComponent(() => import('@/layout/components/main.vue'))
const LayoutHeader = defineAsyncComponent(() => import('@/layout/components/header.vue'))

// ---------------- 定义变量
const route = useRoute()
const router = useRouter()

// ---------------- 生命周期
onMounted(() => {
    // 校验 token
    // checkToken()
})

// ---------------- 函数
// 校验 token
function checkToken () {
    userApi.checkToken().then(() => {
        ElMessage({
            message: 'token 校验成功',
            type: 'success',
        })
    }).catch(e => {
        ElMessage({
            message: e.message,
            type: 'error',
        })
        router.push({
            path: '/login'
        })
    })
}
// 退出登陆
function logOut() {
    // 清除 token，会自动跳转到登陆页面
    Session.remove('token')
    // 使用 reload 时，不需要调用 resetRoute() 重置路由
    window.location.reload()
}
</script>

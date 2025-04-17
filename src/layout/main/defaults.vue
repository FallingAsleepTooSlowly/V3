<template>
    <el-container class="layout-container">
        <LayoutAside />
        <el-container class="h100">
            <el-button type="success" @click="checkToken">校验token</el-button>
            default main default main
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
import userApi from '@/api/user';
import { useRoute, useRouter } from 'vue-router';

// ---------------- 引入组件
const LayoutAside = defineAsyncComponent(() => import('@/layout/components/aside.vue'))

// ---------------- 定义变量
const route = useRoute()
const router = useRouter()

// ---------------- 生命周期
onMounted(() => {
    // 校验 token
    // checkToken()
})

// ----------- 函数
// 校验 token
function checkToken () {
    userApi.checkToken().catch(e => {
        ElMessage({
            message: e.message,
            type: 'error',
        })
        router.push({
            path: '/login'
        })
    })
}
</script>

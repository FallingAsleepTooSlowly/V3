<template>
    <div class="layout-header">
        <el-page-header>
            <!-- <svg-icon icon-name="vue" />
            <i-ep-Fold /> -->
            <template #icon>
                <!-- <el-icon>
                    <component :is="test"></component>
                </el-icon> -->
                <IEpFold />
            </template>
            <template #title>{{ route?.meta?.title }}</template>
            <template #extra>
                <el-button type="success" @click="checkToken">校验token</el-button>
                <el-button type="danger" @click="logOut">退出登陆</el-button>
            </template>
        </el-page-header>
    </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import userApi from '@/api/user';
import { Session } from '@/utils/storage';

// --------------- 变量
const route = useRoute()
const router = useRouter()
const test = IEpFold
// let obj = reactive([{ icon: IEpPlus }, { icon: IEpMinus }, { icon: IEpHouse }, { icon: IEpDelete }])

// --------------- 生命周期
onMounted(() => {
    console.log('route====>', route.name)
    console.log('router====>', router)
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

<style scoped>
.layout-header {
    :deep(.el-page-header__header) {
        line-height: 50px !important;
    }
}
</style>

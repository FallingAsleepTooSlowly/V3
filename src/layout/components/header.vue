<template>
    <div class="layout-header">
        <el-page-header>
            <!-- <svg-icon icon-name="vue" />
            <i-ep-Fold /> -->
            <template #icon>
                <IEpFold v-if="!themeConfig.isCollapse" @click="switchIsCollapse" />
                <IEpExpand v-else @click="switchIsCollapse" />
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
import { useThemeConfig } from '@/stores/themeConfig';
import { storeToRefs } from 'pinia'

// --------------- 变量
// 路由
const route = useRoute()
const router = useRouter()
// 全局布局配置
const { themeConfig } = storeToRefs(useThemeConfig())

// --------------- 生命周期
onMounted(() => {

})

// ---------------- 函数
// 展开收缩侧边栏
function switchIsCollapse() {
    themeConfig.value.isCollapse = !themeConfig.value.isCollapse
}
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

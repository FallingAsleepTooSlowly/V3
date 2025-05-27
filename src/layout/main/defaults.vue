<template>
    <el-container class="layout-container">
        <LayoutAside />
        <el-container class="h100" style="display: flex; flex-direction: column;">
            <el-scrollbar>
                <LayoutHeader />
                <LayoutMain />
            </el-scrollbar>
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

// ---------------- 引入组件
const LayoutAside = defineAsyncComponent(() => import('@/layout/components/aside.vue'))
const LayoutMain = defineAsyncComponent(() => import('@/layout/components/main.vue'))
const LayoutHeader = defineAsyncComponent(() => import('@/layout/components/header.vue'))

// ---------------- 定义变量

// ---------------- 生命周期
onMounted(() => {
    // 校验 token
    // checkToken()
})

// ---------------- 函数

</script>

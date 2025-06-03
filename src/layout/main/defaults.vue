<template>
    <el-container class="layout-container">
        <LayoutAside />
        <el-container class="h100" direction="vertical">
            <!-- <el-scrollbar class="w100"> -->
                <LayoutHeader />
                <LayoutMain />
            <!-- </el-scrollbar> -->
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

<style scoped lang="scss">

</style>

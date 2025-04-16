<template>
    <el-container>
        <LayoutAside />
        <el-container>
            default main default main
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
//---------- 引入组件
const LayoutAside = defineAsyncComponent(() => import('@/layout/components/aside.vue'))
</script>

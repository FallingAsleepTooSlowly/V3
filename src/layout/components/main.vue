<template>
    <el-main class="layout-main">
        <el-scrollbar >
            <router-view class="layout-view">

            </router-view>
        </el-scrollbar>
    </el-main>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.layout-main {
    :deep(.el-scrollbar) {
        background-color: #f8f8f8;
        // padding: 0 20px;
    }

    .layout-view {
        background-color: white;
        margin: 20px;
        padding: 20px;
    }
}
</style>

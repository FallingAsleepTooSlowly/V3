<template>
    <el-main class="layout-main">
        <el-scrollbar>
            <!-- <router-view class="layout-view">
            </router-view> -->
            <!--
                使用 keep-alive 时，若有多层 router-view，需要在每一层或最后一层设置才有效果，
                且页面上的 name 需要按照 vue3 的写法设置，如：
                <script lang="ts">
                    export default { name: "orderManage", };
                </script>
                <script setup lang="ts"></script>
            -->
            <router-view class="layout-view" v-slot="{ Component }">
                <keep-alive :include="['IdentifyAndUpload', 'orderManage']">
                    <component :is="Component" />
                </keep-alive>
            </router-view>
        </el-scrollbar>
    </el-main>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.layout-main {
    // :deep(.el-scrollbar) {
    //     background-color: #f8f8f8;
    //     // padding: 0 20px;
    // }

    // .layout-view {
    //     background-color: white;
    //     margin: 20px;
    //     padding: 20px;
    // }

    :deep(.el-scrollbar) {
        background-color: #EEF0F2;
    }

    :deep(.el-scrollbar__view) {
        height: 100%;
    }
}
</style>

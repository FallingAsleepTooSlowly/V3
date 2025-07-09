<template>
    <!-- <el-config-provider :locale="zhCn"> -->
        <router-view></router-view>
    <!-- </el-config-provider> -->
</template>

<script setup lang="ts">
    // element-plus 默认是英文，需要加上 ElConfigProvider 去设置成中文
    // import zhCn from 'element-plus/lib/locale/lang/zh-cn'
    // const locale = zhCn
</script>

<style scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
}
.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

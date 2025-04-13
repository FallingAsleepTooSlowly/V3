<template>
    <div class="error">
        <svg-icon icon-name="vue" />404<i-ep-CloseBold />
        <div><el-button type="primary" @click="onGoHome">回到首页</el-button></div>
    </div>
</template>

<!-- <keep-alive> 的 include 和 exclude 属性根据组件的 name 进行匹配，如果想要条件性地被 keep-alive 缓存，就必须显式声明一个 name 属性 -->
<!--
    设置 name 的另一种方法：
    export default {
        name: "404"
    }
} -->
<script setup lang="ts" name="404">
    import { useRouter } from 'vue-router';

    const router = useRouter()

    // 返回首页
    const onGoHome = () => {
        router.push('/')
    }
</script>


<style scoped lang="scss">
    .error {
        height: 100%;
    }
</style>

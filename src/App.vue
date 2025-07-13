<template>
    <!-- 使用自动引入 element 时的汉化方式 -->
    <el-config-provider :locale="locale">
        <router-view></router-view>
    </el-config-provider>
</template>

<script lang="ts">
import zhCn from "element-plus/es/locale/lang/zh-cn";

export default defineComponent({
    setup() {
        // 切换为中文
        let locale = zhCn

        return {
            locale
        }
    }
})
</script>

<style scoped></style>

<template>
    <div class="h100">
        <el-aside class="h100" style="background: purple;">

        </el-aside>
    </div>
</template>

<script setup lang="ts">
import { useRoutesList } from '@/stores/routesList'
import { storeToRefs } from 'pinia'

// -------------- 定义变量
const { routesList } = storeToRefs(useRoutesList())

// -------------- 生命周期
onMounted(() => {
    console.log('routesList=====>', routesList.value)
})
</script>

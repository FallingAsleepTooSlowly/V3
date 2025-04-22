<template>
    <div class="h100">
        <el-aside class="h100" style="background: purple;">
            <el-scrollbar>

            </el-scrollbar>
        </el-aside>
    </div>
</template>

<script setup lang="ts">
import { useRoutesList } from '@/stores/routesList'
import { storeToRefs } from 'pinia'
import EventBus from '@/utils/mitt'

// -------------- 定义变量
const { routesList } = storeToRefs(useRoutesList())

// -------------- 生命周期
onMounted(() => {
    filterRoutesFun(routesList.value)
})

// -------------- 定义函数
// 路由过滤递归函数
function filterRoutesFun(routerArr: Array<String>) {
    console.log('routerArr====>', routerArr)
    return routerArr
        .filter((item: any) => { !item.meta?.isHide })
        .map((item: any) => {
            // 拷贝一份
            item = Object.assign({}, item)
        })
}
</script>

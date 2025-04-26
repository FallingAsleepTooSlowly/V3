<template>
    <div class="h100">
        <el-aside class="h100" style="background: purple;">
            <el-scrollbar>
                <el-menu
                    default-active="1"
                    router
                >
                    <template v-for="val in state.menuList">
                        <!-- 有子项 -->
                        <el-sub-menu v-if="val.children && val.children.length" :index="val.path" :key="val.path">
                            <i-ep-Document />
                            <span>{{ val?.meta?.title }}</span>
                        </el-sub-menu>
                        <!-- 无子项 -->
                        <template v-else>
                            <el-menu-item :index="val.path" :key="val.path">
                                <i-ep-Document />
                                <span @click="clickMenuLink(val)">{{ val?.meta?.title }}</span>
                            </el-menu-item>
                        </template>
                    </template>
                </el-menu>
            </el-scrollbar>
        </el-aside>
    </div>
</template>

<script setup lang="ts">
import { useRoutesList } from '@/stores/routesList'
import { storeToRefs } from 'pinia'
import EventBus from '@/utils/mitt'

// -------------- 定义变量
// 全局路由数据
const { routesList } = storeToRefs(useRoutesList())
const state = reactive<AsideState>({
    menuList: [],
    clientWidth: 0
})

// -------------- 生命周期
onMounted(() => {
    console.log('routesList.value====>', routesList.value)
    state.menuList = filterRoutesFun(routesList.value)
    console.log('state.menuList=====>', state.menuList)
})

// -------------- 定义函数
// 路由过滤递归函数
function filterRoutesFun(routerArr: Array<String>) {
    return routerArr
        .filter((item: any) => !item.meta?.isHide)
        .map((item: any) => {
            // 拷贝一份
            item = Object.assign({}, item)
            // 递归筛选出可以显示的 children
            if (item.children) {
                item.children = filterRoutesFun(item.children)
            }
            return item
        })
}
// 点击菜单跳转
function clickMenuLink(val: any) {
    console.log('val====>', val)
}
</script>

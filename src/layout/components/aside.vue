<template>
    <div class="layout-aside h100">
        <!-- width="collapse" 设置宽度跟随 menu -->
        <el-aside class="h100" width="collapse" style="background: purple;">
            <el-scrollbar>
                <el-menu
                    class="vertical-menu"
                    default-active="1"
                    :collapse="themeConfig.isCollapse"
                    router
                >
                    <template v-for="item in state.menuList">
                        <!-- 有子项 -->
                        <el-sub-menu v-if="item.children && item.children.length" :index="item.path" :key="item.path">
                            <i-ep-Document />
                            <span>{{ item?.meta?.title }}</span>
                        </el-sub-menu>
                        <!-- 无子项 -->
                        <template v-else>
                            <el-menu-item :index="item.path" :key="item.path">
                                <!-- <i-ep-Document /> -->
                                <component :is="item.meta.icon" />
                                <span @click="clickMenuLink(item)">{{ item?.meta?.title }}</span>
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
import { useIconList } from '@/stores/iconList'
import { useThemeConfig } from '@/stores/themeConfig'
import { storeToRefs } from 'pinia'
// import EventBus from '@/utils/mitt'

// -------------- 定义变量
// 全局路由数据
const { routesList } = storeToRefs(useRoutesList())
// 全局图标获取
const getIcon = useIconList().getIcon
// 全局布局配置
const { themeConfig } = storeToRefs(useThemeConfig())
// 筛选出的左侧列表展示数据
const state = reactive<AsideState>({
    menuList: [],
    clientWidth: 0
})

// -------------- 生命周期
onMounted(() => {
    state.menuList = filterRoutesFun(routesList.value)
    state.menuList.forEach(item => {
        if (item?.meta?.icon) {
            item.meta.icon = getIcon(item.meta.icon)
        }
    });
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

}
</script>

<style scoped lang="scss">
.layout-aside {
    // 设置展开时的样式
    .vertical-menu:not(.el-menu--collapse) {
        width: 220px;
    }
}
</style>

<template>
    <div class="layout-aside h100">
        <!-- width="collapse" 设置宽度跟随 menu -->
        <el-aside class="h100" width="collapse" style="background: white;">
            <el-scrollbar>
                <div class="menu-top">
                    <img :class="themeConfig.isCollapse ? 'big-title-img-collapse' : 'big-title-img-construct'"
                        src="@/assets/vue.svg"></img>
                    <div v-show="!themeConfig.isCollapse" class="big-title-size big-title">地球防卫军</div>
                </div>
                <el-menu class="vertical-menu" :default-active="activePath" :collapse="themeConfig.isCollapse" router>
                    <template v-for="item in state.menuList" :key="item.path">
                        <!-- 有子项 -->
                        <el-sub-menu v-if="item.children && item.children.length" :index="item.path">
                            <template v-for="childItem in item.children" :key="childItem.path">
                                <el-menu-item :index="childItem.path">
                                    <!-- 使用自动引入的图标 -->
                                    <component :is="childItem.meta.icon" />
                                    <!-- 使用自己本地的图标 -->
                                    <!-- <el-icon v-show="activePath === childItem.path">
                                        <img :src="imgURL(childItem.meta.acIcon)"></img>
                                    </el-icon>
                                    <el-icon v-show="activePath !== childItem.path">
                                        <img :src="imgURL(childItem.meta.icon)"></img>
                                    </el-icon> -->
                                    <span>{{ childItem?.meta?.title }}</span>
                                </el-menu-item>
                            </template>
                        </el-sub-menu>
                        <!-- 无子项 -->
                        <template v-else>
                            <el-menu-item :index="item.path">
                                <!-- 使用自动引入的图标 -->
                                <component :is="item.meta.icon" />
                                <!-- 使用自己本地的图标 -->
                                <!-- <el-icon v-show="activePath === item.path">
                                    <img :src="imgURL(item.meta.acIcon)"></img>
                                </el-icon>
                                <el-icon v-show="activePath !== item.path">
                                    <img :src="imgURL(item.meta.icon)"></img>
                                </el-icon> -->
                                <span>{{ item?.meta?.title }}</span>
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
// 路由
const router = useRouter()
// 全局路由数据
const { routesList } = storeToRefs(useRoutesList())
// 全局图标获取
const getIcon = useIconList().getIcon
// 全局布局配置
const { themeConfig } = storeToRefs(useThemeConfig())
// 当前选中页面
let activePath = ref('/home')
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
    setActivePath()
})

// -------------- 侦听
watch(
    () => router.currentRoute.value.fullPath,
    (newValue, _oldValue) => {
        activePath.value = newValue
    }
)

// -------------- 定义函数
// 获取动态的图片路径
const imgURL = (icon): any => {
    return new URL(`../../assets/images/${icon}`, import.meta.url).href
}

// 获取当前菜单激活路径
const setActivePath = () => {
    activePath.value = router.currentRoute.value.fullPath;
}

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
</script>

<style scoped lang="scss">
.layout-aside {
    // 设置侧边栏的阴影，但是会影响到进度条，所以进度条的样式在全局调整了
    box-shadow: 0px 0 10px 0 #80808036;
    z-index: 1;

    .menu-top {
        display: flex;
        align-items: center;
        height: 92px;
        border-bottom: 1px solid var(--line-color);

        .big-title-img-collapse {
            width: 12px;
            height: 12px;
            margin-left: 20px;
            transition: all 800ms ease;
        }

        .big-title-img-construct {
            width: 34px;
            height: 34px;
            margin-left: 30px;
            transition: all 800ms ease;
        }

        .big-title {
            font-size: var(--big-title-size);
            margin-left: 12px;
            color: var(--theme-color);
            font-weight: bold;
        }
    }

    .el-menu {
        border: none !important;
    }

    // 设置展开时的样式
    .vertical-menu:not(.el-menu--collapse) {
        width: 232px;

        .el-menu-item {
            padding: 0 20px;
            margin: 0 10px;
            margin-top: 5px;
            border-radius: 5px;

            &:nth-of-type(1) {
                margin-top: 10px;
            }
        }

        .el-menu-item.is-active {
            background: linear-gradient(to right, #177AFF, #57B4FE) !important;
            // box-shadow: 5px 0 5px 0 gray;
            color: white;
        }
    }
}
</style>

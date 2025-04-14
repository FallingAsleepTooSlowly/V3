<template>
    <div>
        <div>??????????????</div>
        <component :is="layouts[themeConfig.layout]"></component>
    </div>
</template>

<script setup lang="ts">
import { useThemeConfig } from '@/stores/themeConfig';
import { storeToRefs } from 'pinia';

//---------- 引入组件
const layouts: any = {
    defaults: defineAsyncComponent(() => import('@/layout/main/defaults.vue'))
}

//---------- 定义变量
const storesThemeConfig = useThemeConfig()
// storeToRefs 将 Pinia 状态管理库中的 store 对象的状态转换为响应式的 ref 对象集合
const { themeConfig } = storeToRefs(storesThemeConfig)

//---------- 生命周期
onBeforeMount(() => {
    window.addEventListener('resize', latoutResize)
})
onMounted(() => {
    console.log('themeConfig.layout====>', themeConfig.value.layout)
})

//---------- 定义方法
const latoutResize = () => {
    const clientWidth = document.body.clientWidth
    console.log('clientWidth===========>', clientWidth)
}



</script>

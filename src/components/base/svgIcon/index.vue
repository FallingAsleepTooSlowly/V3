<!-- 自定义的 svg 组件 -->
<!-- 
    配置好 virtual:svg-icons-register 插件后，会自动扫描指定目录下的 svg 文件，并将其注册为 Vue 组件，
    使用时只需要在 :xlink:href 里按照 `#icon-<svg文件名>` 的格式就能直接使用 svg 文件
-->
<!-- 
    使用方式
    引入：  import svgIcon from '@/components/svgIcon/index.vue'
    使用：  <svg-icon icon-name="<svg文件名>" class-name="<需要添加的类名>" /> 
-->
<template>
    <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="iconHref"></use>
    </svg>
</template>
  
<script setup>
    import { computed } from 'vue';
    
    // defineProps 和 defineEmits 可以自动地在 <script setup> 中可用
    const props = defineProps({
        iconName: {
            type: String,
            required: true,
        },
        className: {
            type: String,
            default: '',
        },
    });
    
    const iconHref = computed(() => `#icon-${props.iconName}`);
    const svgClass = computed(() => `svg-icon ${props.className}`);
</script>
    
<style scoped>
    .svg-icon {
        width: 1em;
        height: 1em;
        fill: currentColor;
        vertical-align: middle;
    }
</style>
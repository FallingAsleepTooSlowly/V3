<template>
    <div class="user">
        <!--
            action 为请求的 url
            show-file-list 是否显示已上传的文件
        -->
        <el-upload
            class="portrait-upload"
            action="http://localhost:9000/user/uploadPortrait"
            :show-file-list="false"
            method="post"
        >
            <img v-if="portrait" :src="portrait">
            <IEpPlus v-else class="icon"></IEpPlus>
        </el-upload>
    </div>
</template>

<script setup>
import { useUserInfo } from '@/stores/userInfo';
import { storeToRefs } from 'pinia';
// --------------- 变量
// 头像图片
const portrait = ref('')
// 全局保存的用户信息
const { userInfo } = storeToRefs(useUserInfo())

// --------------- 生命周期
onMounted(() => {
    console.log('userInfo===>', userInfo.value.name)
})

// ---------------- 函数
function getNewUserInfo () {

}

</script>

<style scoped lang="scss">
.user {
    .portrait-upload {
        border: 1px solid #333;
        display: inline-flex;

        img {
            width: 150px;
            height: 150px;
        }
        .icon {
            width: 150px;
            height: 150px;
        }
    }
}
</style>

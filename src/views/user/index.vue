<template>
    <div class="user">
        <!--
            action  为请求的 url
            show-file-list  是否显示已上传的文件
            headers  请求头
            data  上传时附带的额外参数
        -->
        <el-upload
            class="portrait-upload"
            action="http://localhost:9000/user/uploadPortrait"
            :show-file-list="false"
            method="post"
            :headers="{ token: Session.get('token') }"
            :data="{ name: userInfo.name }"
        >
            <img v-if="portrait" :src="portrait">
            <IEpPlus v-else class="icon"></IEpPlus>
        </el-upload>
        <img src="http://192.168.132.242:9000/static/portrait/1111.jpeg">
    </div>
</template>

<script setup>
import { useUserInfo } from '@/stores/userInfo';
import { storeToRefs } from 'pinia';
import userApi from '@/api/user';
import { Session } from "@/utils/storage";
// --------------- 变量
// 头像图片
const portrait = ref('')
// 全局保存的用户信息
const { userInfo } = storeToRefs(useUserInfo())

// --------------- 生命周期
onMounted(() => {
    console.log('userInfo===>', userInfo.value.name)
    getUserInfoByUserName()
})

// ---------------- 函数
// 获取最新用户信息
function getUserInfoByUserName () {
    userApi.getUserInfoByUserName({
        name: userInfo.value.name
    }).then(res => {
        console.log("getUserInfoByUserName====>", res)
        if (res.data) {
            // // 保存用户信息到本地
            // Session.set('userInfo', res.data)
            // // 保存信息到全局
            // useUserInfo().setUserInfo()
        }
    })
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

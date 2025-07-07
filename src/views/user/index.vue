<template>
    <div class="user">
        <!--
            action  为请求的 url
            show-file-list  是否显示已上传的文件
            headers  请求头
            data  上传时附带的额外参数
            on-success  上传成功的钩子
            multiple  是否支持多选文件
        -->
        <el-upload
            class="portrait-upload"
            action="api/user/uploadPortrait"
            :show-file-list="false"
            method="post"
            :headers="{ token: Session.get('token') }"
            :data="{ name: userInfo.name }"
            :on-success="uploadPortrait"
        >
            <img v-if="userInfo.portrait" class="u-portrait" :src="constant.portraitAddress + userInfo.portrait + '?token=' + Session.get('token')">
            <IEpPlus v-else class="u-portrait"></IEpPlus>
        </el-upload>
    </div>
</template>

<script setup lang="ts">
import { useUserInfo } from '@/stores/userInfo';
import { storeToRefs } from 'pinia';
import userApi from '@/api/user';
import { Session } from "@/utils/storage";
import constant from "@/common/constant"
// --------------- 变量
// 全局保存的用户信息
const { userInfo } = storeToRefs(useUserInfo())
// 上传文件元素
const uploadFileRef = ref(null)

// --------------- 生命周期
onMounted(() => {
    getUserInfoByUserName()
})

// ---------------- 函数

// 上传文件回调
function uploadPortrait (res) {
    if (res && res.code === 0) {
        ElMessage.success('头像上传成功！')
        getUserInfoByUserName()
    } else {
        if (res.message) {
            ElMessage.error(res.message)
        } else {
            ElMessage.error('头像上传失败')
        }
    }
}

// 获取最新用户信息
function getUserInfoByUserName () {
    userApi.getUserInfoByUserName({
        name: userInfo.value.name
    }).then(res => {
        if (res.data) {
            // 保存用户信息到本地
            Session.set('userInfo', res.data)
            // 保存信息到全局
            useUserInfo().setUserInfo()
        }
    })
}

</script>

<style scoped lang="scss">
.user {
    .portrait-upload {
        border: 1px solid #333;
        display: inline-flex;

        .u-portrait {
            width: 150px;
            height: 150px;
        }
    }
}
</style>

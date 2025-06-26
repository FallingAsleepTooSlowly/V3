<template>
    <div class="user">
        <!--
            action  为请求的 url
            show-file-list  是否显示已上传的文件
            headers  请求头
            data  上传时附带的额外参数
            on-success  上传成功的钩子
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
            <img v-if="userInfo.portrait" :src="constant.portraitAddress + userInfo.portrait">
            <IEpPlus class="icon"></IEpPlus>
        </el-upload>
        <el-upload
            class="portrait-upload"
            action="api/upload/uploadFile"
            :show-file-list="false"
            method="post"
            :headers="{ token: Session.get('token') }"
            :data="{ id: userInfo.id }"
        >
            <IEpPlus class="icon"></IEpPlus>
        </el-upload>
        <!-- <img src="http://192.168.132.242:9000/static/portrait/1111.jpeg"> -->

        <div style="margin-top: 15px;">
            <el-upload
                v-model:file-list="fileList"
                ref="uploadFileRef"
                :auto-upload="false"
            >
                <template #trigger>
                    <el-button type="primary">select file</el-button>
                </template>

                <el-button class="ml-3" type="success" @click="clickUpload(0)">
                    upload to server
                </el-button>

                <template #tip>
                    <div class="el-upload__tip">
                        jpg/png files with a size less than 500kb
                    </div>
                </template>
            </el-upload>
        </div>

        <div style="margin-top: 15px;">
            <input type="file" id="file" name="file" accept="*" >
            <input type="button" value="上传" @click="uploadTest(0)">
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUserInfo } from '@/stores/userInfo';
import { storeToRefs } from 'pinia';
import userApi from '@/api/user';
import uploadApi from '@/api/upload';
import { Session } from "@/utils/storage";
import constant from "@/common/constant"
// --------------- 变量
// 全局保存的用户信息
const { userInfo } = storeToRefs(useUserInfo())
// 上传文件元素
const uploadFileRef = ref(null)
// 上传文件数据
const fileList = ref([])
// const fileList = ref([])

// --------------- 生命周期
onMounted(() => {
    getUserInfoByUserName()
})

// ---------------- 函数
// 上传文件回调
function uploadPortrait (res) {
    console.log('uploadPortraituploadPortrait===>', res)
    if (res && res.code === 0) {
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

// 点击上传文件按钮
function clickUpload (index) {
    // ** proxy 代理的转换方式
    // toRaw(fileList.value)
    // JSON.parse(JSON.stringify(fileList.value))
    // ** 上传文件元素的手动调用方式
    // uploadFileRef.value.$el.querySelector('input').click()

    // 大文件的大小标准
    const MAX_SIZE = 40 * 1024 * 1024
    if (!fileList.value[0]) {
        ElMessage.error('请选择文件')
        return
    }
    // 获取文件对象
    let file = fileList.value[index] as fileObject
    // 判断文件大小是否需要分段上传
    if (file.size < MAX_SIZE) {
        // uploadSingleFile(fileList.value[index])
        uploadSingleFile(fileList.value[index])
    }
    // 获取文件名和扩展名
    // let [fileName, fileExt] = file.name.split(".")
}
// 大文件上传分段文件
/*
    arguments:
    index: 文件的下标
    sectionIndex: 文件分段的下标
*/
function uploadSectionFile (index, sectionIndex: 0) {

}
// 小文件直接上传
function uploadSingleFile (file) {
    // 获取参数
    const formData = new FormData()
    /*
        node 的 multer 在识别到入参是文件类型时就会触发存储的方法，后面 append 的入参就识别不到，
        所以如果存储方法会用到其它变量的话，尽量把文件放在最后 append
    */
    //
    formData.append('id', userInfo.value.id as any)
    formData.append('file', file.raw)

    // 调用接口
    uploadApi.uploadSingleFile(formData).then(res => {
        console.log('uploadSingleFile====>', res)
    })
}

// ---------------- else

// 不使用 element 组件上传文件
function uploadTest (index) {
    // var fileInput = document.getElementById("file").files
    // 使用下面这种写法
    var fileInput = document.getElementById("file")!["files"]
    // 获取参数
    const formData = new FormData()
    formData.append('file', fileInput[0])
    formData.append('id', userInfo.value.id as any)

    // 调用接口
    uploadApi.uploadSingleFile(formData).then(res => {
        console.log('uploadSingleFile====>', res)
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

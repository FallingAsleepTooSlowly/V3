<template>
    <div class="files">
        <el-upload
            class="files-upload"
            action="api/upload/uploadFile"
            :show-file-list="false"
            method="post"
            :headers="{ token: Session.get('token') }"
            :data="{ id: userInfo.id }"
        >
            <IEpPlus class="files-upload"></IEpPlus>
        </el-upload>
        <!-- <img src="http://192.168.132.242:9000/static/portrait/1111.jpeg"> -->

        <!-- 大小文件上传 -->
        <div style="margin-top: 15px;">
            <el-upload
                v-model:file-list="fileList"
                ref="uploadFileRef"
                :auto-upload="false"
                :multiple="true"
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

        <!-- 用户文件获取 -->
        <div>
            <el-button type="success">获取用户文件</el-button>
        </div>

        <el-icon>
            <IFciOpenedFolder />
        </el-icon>

        <!-- ---------------- else -->

        <!-- <el-button @click="mergeChunkFile">手动合并</el-button> -->

        <!-- 原生文件上传 -->
        <!-- <div style="margin-top: 15px;">
            <input type="file" id="file" name="file" accept="*" >
            <input type="button" value="上传" @click="uploadTest(0)">
        </div> -->

    </div>
</template>

<script setup lang="ts">
import { useUserInfo } from '@/stores/userInfo';
import { storeToRefs } from 'pinia';
import userApi from '@/api/user';
import filesApi from '@/api/files';
import { Session } from "@/utils/storage";

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
        uploadSingleFile(index)
    } else {
        uploadChunkFile(index, 0)
    }
}
// 小文件直接上传
/*
    arguments:
    index: 当前上传的文件的下标
*/
function uploadSingleFile (index) {
    const nowFile = fileList.value[index] as any
    // 获取参数
    const formData = new FormData()
    /*
        node 的 multer 在识别到入参是文件类型时就会触发存储的方法，后面 append 的入参就识别不到，
        所以如果存储方法会用到其它变量的话，尽量把文件放在最后 append
    */
    formData.append('id', userInfo.value.id as any)
    formData.append('file', nowFile.raw)

    // 调用接口
    filesApi.uploadSingleFile(formData).then(res => {
        if (index < fileList.value.length - 1) {
            clickUpload(index + 1)
        } else {
            let fileNum = index + 1
            ElMessage.success(fileNum + '个文件上传成功')
        }
    })
}
// 大文件上传分段文件
/*
    arguments:
    file: 当前上传的文件
    index: 文件的下标
    sectionIndex: 文件分段的下标
*/
function uploadChunkFile(index, sectionIndex) {
    /* 每次循环固定的内容 */
    // 切割后每一块文件的大小
    const chunkSize = 5 * 1024 * 1024
    // 获取到原大文件
    const nowFile = fileList.value[index] as any
    // 获取文件名和扩展名
    let [fname, ext] = nowFile.name.split('.')

    // 开始分块，start 为每次分块的起始位置
    let start = sectionIndex * chunkSize
    // 如果起始位置大于文件大小，代表文件已分块上传完
    if (start > nowFile.size) {
        mergeChunkFile(index, nowFile.name)
        return
    }


    // Blob 对象表示一个不可变、原始数据的类文件对象，可以按文本或二进制的格式进行读取，也可以转换成 ReadableStream 来用于数据操作。
    // 获取到本次需要上传的文件块
    let blob = nowFile.raw.slice(start, start + chunkSize)
    // 确定文件名，后端会用到此文件名，要按规定设置
    let blobName = `${fname}.${sectionIndex}.${ext}`
    /*
        new File(fileBits, fileName, options); 用于创建一个新的文件实例
            fileBits: 一个可迭代对象，例如一个具有 ArrayBuffer、TypedArray、DataView、Blob、字符串或任何此类元素的组合的数组，将被放入 File 内。
                    请注意，这里的字符串被编码为 UTF-8，与通常的 JavaScript UTF-16 字符串不同，
                    文件用 [] 括起来？
            fileName: 表示文件名或文件路径的字符串
            options(非必填): 包含文件可选属性的选项对象
                    type: 表示将放入文件的内容的 MIME 类型的字符串。默认值为 ""
                    endings: 如果数据是文本，如何解释内容中的换行符（\n）。默认值 transparent 将换行符复制到 blob 中而不更改它们。要将换行符转换为主机系统的本机约定，指定值为 native
            lastModified: 一个数字，表示 Unix 时间纪元与文件上次修改时间之间的毫秒数。默认值为调用 Date.now() 返回的值
    */
    // 分段完成，作为入参的文件
    let blobFile = new File([blob], blobName)

    // 获取参数
    const formData = new FormData()
    /*
        node 的 multer 在识别到入参是文件类型时就会触发存储的方法，后面 append 的入参就识别不到，
        所以如果存储方法会用到其它变量的话，尽量把文件放在最后 append
    */
    formData.append('id', userInfo.value.id as any)
    formData.append('file', blobFile)

    // 分块上传文件接口
    filesApi.uploadChunkFile(formData).then(res => {
        uploadChunkFile(index, ++sectionIndex)
    })
}
// 合并分块上传的文件
function mergeChunkFile(index, fileName) {
    // 获取参数
    const formData = new FormData()
    /*
        node 的 multer 在识别到入参是文件类型时就会触发存储的方法，后面 append 的入参就识别不到，
        所以如果存储方法会用到其它变量的话，尽量把文件放在最后 append
    */
    formData.append('id', userInfo.value.id as any)
    formData.append('fileName', fileName)

    // 合并文件接口
    filesApi.mergeChunkFile(formData).then(res => {
        if (index < fileList.value.length - 1) {
            clickUpload(index + 1)
        } else {
            let fileNum = index + 1
            ElMessage.success(fileNum + '个文件上传成功')
        }
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
    formData.append('id', userInfo.value.id as any)
    formData.append('file', fileInput[0])

    // 调用接口
    filesApi.uploadSingleFile(formData).then(res => {
        console.log('uploadSingleFile====>', res)
    })
}
</script>

<style scoped lang="scss">
.files {
    .files-upload {
        border: 1px solid #333;
        width: 150px;
        height: 150px;
    }
}
</style>

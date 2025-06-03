<template>
    <div class="user">
        <el-upload class="portrait-upload">
            <img v-if="portrait" :src="portrait">
            <IEpPlus v-else class="icon"></IEpPlus>
        </el-upload>
        <div>
            <el-upload class="portrait-upload">
                <img v-if="portrait" :src="portrait">
                <IEpPlus v-else class="icon"></IEpPlus>
            </el-upload>
        </div>
        <div>
            <el-upload class="portrait-upload">
                <img v-if="portrait" :src="portrait">
                <IEpPlus v-else class="icon"></IEpPlus>
            </el-upload>
        </div>
        <div>
            <el-upload class="portrait-upload">
                <img v-if="portrait" :src="portrait">
                <IEpPlus v-else class="icon"></IEpPlus>
            </el-upload>
        </div>
    </div>
</template>

<script setup>
// --------------- 变量
// 头像图片
const portrait = ref('')

// ---------------- 函数

</script>

<style scoped lang="scss">
.user {
    background-color: white;
    margin: 20px;
    padding: 20px;
    .portrait-upload {
        border: 1px solid #333;
        display: inline-flex;

        img {
            width: 150px;
            height: 150px;
        }
        .icon {
            width: 150px;
            height: 650px;
        }
    }
}
</style>

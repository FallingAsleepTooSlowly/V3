<template>
    <div class="login flex-center">
        <div class="login-box flex-column">
            <div class="login-top flex-center">欢迎</div>
            <div class="flex-row-center flex-1">
                <div class="login-main">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="用户名登陆" name="nameLogin">

                        </el-tab-pane>
                        <el-tab-pane label="手机号登陆" name="second">
                            暂未开放此功能
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    // import { ref } from 'vue';
    import type { TabsPaneContext } from 'element-plus'

    const activeName = ref("nameLogin")
    const handleClick = (tab: TabsPaneContext, event: Event) => {
        console.log("tab===>", JSON.parse(JSON.stringify(tab)))
        console.log("event====>", event)
        console.log("activeName===>", activeName.value)
    }
</script>

<style scoped>
.login {
    .login-box {
        width: 500px;
        height: 500px;
        border: 1px solid;
        border-radius: 5px;

        .login-top {
            height: 130px;
            border: 1px solid red;
            box-sizing: border-box;
        }

        .login-main {
            width: 80%;
            height: 88%;
            border: 1px solid purple;
        }
    }
}
</style>
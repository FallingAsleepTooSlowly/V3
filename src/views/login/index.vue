<template>
<div class="login flex-center">
    <div class="login-box flex-column">
        <div class="login-top flex-center">欢迎</div>
        <div class="flex-row-center flex-1">
            <div class="login-main-box">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane class="login-main" label="用户名登陆" name="nameLogin">
                        <!-- <div class="login-main"></div> -->
                        <el-input class="login-user-name input-box"></el-input>
                        <el-input class="login-pass-word input-box"></el-input>
                        <el-input class="login-code input-box"></el-input>
                        <div class="login-btn-box">
                            <el-button type="primary" class="login-confirm" @click="changeTheme"></el-button>
                        </div>
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

// 修改主题颜色
function changeTheme() {
    document.documentElement.style.setProperty('--el-color-primary', "purple");
}
    
</script>

<style scoped lang="scss">
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

        .login-main-box {
            width: 80%;
            height: 88%;

            :deep(.el-tabs) {
                height: 100%;
            }

            .login-main {
                height: 100%;
                display: flex;
                flex-direction: column;

                .input-box {
                    height: 40px;
                    margin-top: 20px;
                }
                .login-btn-box {
                    flex: 1;
                    position: relative;

                    .login-confirm {
                        position: absolute;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        height: 40px;
                    }
                }
            }
        }
    }
}
</style>
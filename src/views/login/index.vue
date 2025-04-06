<template>
<div class="login flex-center">
    <div class="login-box border flex-column">
        <div class="login-top flex-center"></div>
        <div class="flex-row-center flex-1">
            <div class="login-main-box">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane class="login-main" label="用户名登陆" name="nameLogin">
                        <!-- <div class="login-main"></div> -->
                        <el-input class="login-user-name input-box up-animation"></el-input>
                        <el-input class="login-pass-word input-box up-animation"></el-input>
                        <el-input class="login-code input-box up-animation"></el-input>
                        <div class="login-btn-box">
                            <el-button type="primary" class="login-confirm up-animation" @click="login">确定</el-button>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="手机号登陆" name="second">
                        暂未开放此功能
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
    <div>
        <el-button type="success" @click="checkToken">校验token</el-button>
    </div>
</div>
</template>

<script lang="ts" setup>
// import { ref } from 'vue';
import type { TabsPaneContext } from 'element-plus'
import { useChangeColor } from '@/utils/theme'
// import { userPostApi } from '@/api/user'
import userApi from '@/api/user'
import { useRoute, useRouter } from 'vue-router'
import { Session } from '@/utils/storage'

const route = useRoute()
const router = useRouter()
// 变更主题的方法
const { getDarkColor, getLightColor } = useChangeColor()

const activeName = ref("nameLogin")

const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log("tab===>", JSON.parse(JSON.stringify(tab)))
    console.log("event====>", event)
    console.log("activeName===>", activeName.value)
}

// 登陆接口
function login() {
    userApi.login({
        name: "ganhuan"
    }).then(res => {
        console.log('userPost=====>', res)
        window.localStorage.setItem("token", res.token)
    }).catch(e => {
        console.log('eeeee===>', e)
    })
}

// 校验 token 接口
function checkToken() {
    userApi.checkToken().then(res => {
        console.log('checkToken===>', res)
    })

}

function loginIn() {
    Session.set('token', Math.random().toString(36).substring(0));
    console.log('string===>', JSON.parse(<string>route.query?.params))
    if (route.query?.redirect) {
        router.push({
            path: <string>route.query?.redirect,
            query: Object.keys(<string>route.query?.params).length > 0 ? JSON.parse(<string>route.query?.params) : '',
        })
    }
}

// 修改主题颜色
function changeTheme() {
    console.log("env===>", import.meta.env)
    // 这样使用 getPropertyValue 的话，在 setProperty 之前获取不到值
    // if (document.documentElement.style.getPropertyValue('--theme-color') === "#409eff") {}
    if (getComputedStyle(document.documentElement).getPropertyValue('--theme-color') === "#409eff") {
        // 设置默认主题颜色变量
        document.documentElement.style.setProperty('--el-color-primary', "#800080");
        document.documentElement.style.setProperty('--theme-color', "#800080");
        // 设置深色
        document.documentElement.style.setProperty('--el-color-primary-dark-2', `${getDarkColor(getComputedStyle(document.documentElement).getPropertyValue('--theme-color'), 0.1)}`);
        // 设置浅色
        for (let i = 1; i <= 9; i++) {
            document.documentElement.style.setProperty(`--el-color-primary-light-${i}`, `${getLightColor(getComputedStyle(document.documentElement).getPropertyValue('--theme-color'), i / 10)}`);
        }
    } else {
        // 设置默认主题颜色变量
        document.documentElement.style.setProperty('--el-color-primary', "#409eff");
        document.documentElement.style.setProperty('--theme-color', "#409eff");
        // 设置深色
        document.documentElement.style.setProperty('--el-color-primary-dark-2', `${getDarkColor(getComputedStyle(document.documentElement).getPropertyValue('--theme-color'), 0.1)}`);
        // 设置浅色
        for (let i = 1; i <= 9; i++) {
            document.documentElement.style.setProperty(`--el-color-primary-light-${i}`, `${getLightColor(getComputedStyle(document.documentElement).getPropertyValue('--theme-color'), i / 10)}`);
        }
    }
}

</script>

<style scoped lang="scss">
.login {
    .login-box {
        width: 500px;
        height: 500px;
        border-radius: 5px;

        .login-top {
            height: 130px;
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
                overflow: hidden;

                .input-box {
                    height: 40px;
                    margin-top: 20px;
                }
                .up-animation {
                    animation: loginUp 1s;
                    animation-fill-mode: backwards;
                }
                .login-pass-word {
                    animation-delay: 50ms;
                }
                .login-code {
                    animation-delay: 100ms;
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
                        animation-delay: 150ms;
                        letter-spacing: 6px;
                    }
                }
            }
        }
    }
}
</style>

<template>
<div class="login flex-center">
    <div class="login-box border flex-column">
        <div class="login-top flex-center"></div>
        <div class="flex-row-center flex-1">
            <div class="login-main-box">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane class="login-main" label="用户名登陆" name="nameLogin">
                        <!-- <div class="login-main"></div> -->
                        <el-input
                            class="login-user-name input-box up-animation"
                            placeholder="请输入用户名"
                            :prefix-icon="User"
                        ></el-input>
                        <el-input
                            class="login-pass-word input-box up-animation"
                            placeholder="请输入密码"
                            :prefix-icon="Lock"
                        ></el-input>
                        <el-input
                            class="login-code input-box up-animation"
                            placeholder="请输入验证码"
                            :prefix-icon="Stopwatch"
                        ></el-input>
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
        <el-button type="success" @click="checkLogin">校验登陆</el-button>
    </div>
</div>
</template>

<script lang="ts" setup>
// import { ref } from 'vue';
import type { TabsPaneContext } from 'element-plus';
import { useChangeColor } from '@/utils/theme';
// import { userPostApi } from '@/api/user';
import userApi from '@/api/user';
import { useRoute, useRouter } from 'vue-router';
import { Session } from '@/utils/storage';
import { useUserInfo } from '@/stores/userInfo';
import { initFrontControlRoutes } from '@/router/front'
import { User, Lock, Stopwatch } from '@element-plus/icons-vue'

// -------------- 定义变量
const route = useRoute()
const router = useRouter()
const storesUserInfo = useUserInfo()

// -------------- 定义函数
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
        name: "ganhuan",
        password: "123456"
    }).then(res => {
        console.log('userPost=====>', res)
        if (res.data) {
            // 前端自己生成 token 并保存到本地
            // Session.set('token', Math.random().toString(36).substring(0));
            // 保存后端返回的 token 到本地
            Session.set('token', res.token)
            // 保存用户信息到本地
            Session.set('userInfo', res.data)

            afterLogin()
        }
    }).catch(e => {
        console.log('eeeee===>', e)
    })
}

// 登陆成功后的跳转
async function afterLogin () {
    // 执行动态路由初始化
    const checkPermission = await initFrontControlRoutes()
    if (checkPermission) {
        ElMessage.warning("抱歉，您没有登录权限")
        Session.clear()
    } else {
        // 跳转到预先要跳转的页面
        if (route.query?.redirect) {
            router.push({
                path: <string>route.query?.redirect,
                query: Object.keys(<string>route.query?.params).length > 0 ? JSON.parse(<string>route.query?.params) : '',
            })
        } else {
            router.push({
                path: '/'
            })
        }
    }
}

// 校验 login 存储调用
async function checkLogin () {
    let res = await storesUserInfo.getApiUserInfo()
    console.log('checkLogincheckLogin=====>', res)
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

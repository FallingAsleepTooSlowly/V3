<template>
    <div class="login flex-center">
        <div class="login-box flex-column">
            <div class="login-top flex-center">欢迎</div>
            <div class="login-main flex-row-center flex-1">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="User" name="first">User</el-tab-pane>
                    <el-tab-pane label="Config" name="second">Config</el-tab-pane>
                    <el-tab-pane label="Role" name="third">Role</el-tab-pane>
                    <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    // import { ref } from 'vue';
    import type { TabsPaneContext } from 'element-plus'

    const activeName = ref("third")
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
        }

        .login-main {
            width: 80%;
            margin: 0 auto;
        }
    }
}
</style>
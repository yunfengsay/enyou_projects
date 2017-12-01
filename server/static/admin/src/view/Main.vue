<style lang="less">
ul {
    padding: 0;
    height: 100%;
    overflow: auto;
    li {
        list-style-type: none;
    }
}

body {
    margin: 0
}

.container {
    position: relative;
    height: 100%;
    >div {
        height: 100%;
    }
    .el-tabs {
        display: flex;
        flex-direction: column;
    }
    .el-tabs__content {
        flex: 1;
        .el-tab-pane {
            height: 100%;
        }
    }
    .change-pwd {
        position: absolute;
        top: 3px;
        right: 10px;
    }
    .change-pwd-form{
        div{
            margin: 10px 0;
        }
    }
}
</style>
<template>
    <div class="container">
        <el-tabs v-model="activeName">
            <el-tab-pane label="学习干货" name="first">
                <Learn />
            </el-tab-pane>
            <el-tab-pane label="公益法规" name="second">
                <Law />
            </el-tab-pane>
        </el-tabs>
        <el-button @click="changePwdDialog = true" class="change-pwd" round>修改密码</el-button>
        <el-dialog title="修改密码" :visible.sync="changePwdDialog">
            <el-form class="change-pwd-form">
                <el-input placeholder="新密码" v-model="user.pwd" clearable></el-input>
                <el-input placeholder="token" v-model="user.token" clearable>
                </el-input>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="changePwdDialog = false">取 消</el-button>
                <el-button type="primary" @click="changePwd">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import Law from "../components/Law.vue"
import Learn from "../components/Learn.vue"
export default {
    name: "Main",
    data() {
        return {
            activeName: "first",
            changePwdDialog: false,
            user: {
                pwd: "",
                token: ""
            },
        }
    },
    methods: {
        async changePwd() {
            if (this.user.pwd && this.user.token) {
                let res = await $http.post("/changepwd", this.user)
                if (res.data.ok) {
                    this.$message({
                        message: '修改成功请重新登录',
                        type: 'success',
                        duration: 1000
                    });
                    setTimeout(function() {
                        window.location.href = "/login"
                    }, 500);
                } else{
                    this.$message({
                        message: res.data.message,
                        type: 'error',
                        duration: 1000
                    })
                }
            } else {
                this.$message({
                    showClose: true,
                    message: '请填写完整',
                    type: 'warning',
                    duration: 1000
                });
            }
        }
    },
    mounted: async function() {

    },
    components: {
        Learn,
        Law
    }
}
</script>
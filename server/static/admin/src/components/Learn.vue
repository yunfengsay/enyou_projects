<style lang="less">
.learn-container {
    height: 100%;
    display: flex;
    .left {
        flex: 2;
        background: #f3f3f3;
        li {
            display: flex;
            justify-content: space-between;
            line-height: 2rem;
            transition: all .4s ease;
            padding: 2px 5px;
            &:hover{
                background-color: #90A4AE;
                // color: #fff;
                box-shadow: 0 -1px 20px rgba(0, 0, 0, 0.2);
                *{
                    // color: #fff
                }
            }
        }
        .actions {
            i {
                cursor: pointer !important;
                margin-right: 10px;
            }
        }
    }
    .right {
        flex: 3;
        display: flex;
        align-items: center;
        justify-content: center;
        .add-action-container {
            min-width: 400px;
            >div {
                margin: 10px 0;
            }
            button {
                width: 100%;
            }
        }
    }
    .edit-form {
        div {
            margin: 10px 0;
        }
    }
}
</style>
<template>
    <div class="learn-container">
        <el-dialog title="删除" :visible.sync="deleteTip" width="30%" center>
            <span>确认删除
                <span style="color: red">{{currentItem.title}}</span> 吗?</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteTip = false">取 消</el-button>
                <el-button type="primary" @click="deleteItem">确 定</el-button>
            </span>
        </el-dialog>
        <section class="left">

            <ul>
                <li v-for="(v,i) in articals">
                    <!-- <a target="_blank" :href="v.url"> {{v.title}}</a> -->
                                            <a target="_blank" :href="v.url">
              <i class="url-index">{{i+1}}.</i><span class="url-name">{{ v.title}}</span>
            </a>
                    <span class="actions">

                        <i @click="editDialog = true;editArtical = Object.assign({},v)" class="el-icon-edit"></i>
                        <i @click="deleteTip = true;currentItem = v" class="el-icon-delete"></i>
                    </span>
                </li>
            </ul>
        </section>
        <section class="right">
            <div class="add-action-container">
                <el-input placeholder="请输入标题" v-model="addArtical.title" clearable></el-input>
                <el-input placeholder="请输入链接" v-model="addArtical.url" clearable>
                </el-input>
                <el-button @click="addArticalAction" type="primary">提交</el-button>
            </div>
        </section>
        <el-dialog title="编辑" :visible.sync="editDialog">
            <el-form class="edit-form">
                <el-input placeholder="请输入标题" v-model="editArtical.title" clearable></el-input>
                <el-input placeholder="请输入链接" v-model="editArtical.url" clearable>
                </el-input>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editDialog = false">取 消</el-button>
                <el-button type="primary" @click="editItem">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: "Learn",
    data() {
        return {
            articals: [],
            addArtical: {
                title: "",
                url: ""
            },
            deleteTip: false,
            currentItem: {},
            editArtical: {
                title: "",
                url: "",
                Id: ""
            },
            editDialog: false
        }
    },
    methods: {
        async getArticlas() {
            let res = await this.$http.get("/articals")
            let data = res.data.data
            this.articals = data
        },
        async addArticalAction() {
            let res = await $http.post("/articals", this.addArtical)

            if (res.data.ok) {
                this.$message({
                    message: '添加成功',
                    type: 'success',
                    duration: 1000
                });
            } else {
                this.$message.error('添加失败');
            }
            this.addArtical = {
                title: "",
                url: ""
            }
            this.getArticlas()
        },
        async editItem() {
            if (this.editArtical.title && this.editArtical.url) {
                let res = await $http.put("/articals", this.editArtical)
                if (res.data.ok) {
                    this.$message({
                        message: '编辑成功',
                        type: 'success',
                        duration: 1000
                    });
                    this.editDialog = false
                    this.getArticlas()
                } else {
                    this.$message.error('编辑失败');
                }
            } else {
                this.$message({
                    showClose: true,
                    message: '请填写完整',
                    type: 'warning',
                    duration: 1000
                });
            }

        },
        async deleteItem() {
            let res = await $http.delete("/articals/" + this.currentItem.Id)
            if (res.data.ok) {
                this.deleteTip = false
                this.$message({
                    message: '删除成功',
                    type: 'success',
                    duration: 1000
                });
                this.getArticlas()
            } else {
                this.$message.error('删除失败');
            }

        }
    },
    mounted: async function() {
        this.getArticlas()
    }
}
</script>
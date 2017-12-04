<style lang="less">
.law-container {
    display: flex;
    height: 100%;
    ul{
        margin-top: 5px;
    }
    button{
        margin: 5px;
    }
    .law-left {
        flex: 1;
        border-right: 1px solid #b4bccc;
        padding-left: 10px !important;
        li {
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            line-height: 2rem;
            transition: all .4s ease;
            padding: 2px 5px !important;
            &:hover {
                background-color: #90A4AE; // color: #fff;
                box-shadow: 0 -1px 20px rgba(0, 0, 0, 0.2);
                * {
                    // color: #fff
                }
            }
        }
    }
    .law-right {
        flex: 1;
          li {
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            line-height: 2rem;
            transition: all .4s ease;
            padding: 2px 5px !important;
            &:hover {
                background-color: #90A4AE; // color: #fff;
                box-shadow: 0 -1px 20px rgba(0, 0, 0, 0.2);
                color: #fff;
                * {
                    // color: #fff
                }
            }
        }
    }
    .activeLi {
        background: #607D8B;
        color: #fff;
    }
    .edit-form {
        div {
            margin: 10px 0;
        }
    }
}
</style>
<template>
    <div class="law-container">
        <el-dialog title="删除" :visible.sync="deleteTip" width="30%" center>
            <span>确认删除
                <span style="color: red">{{clickEditem.title}}</span> 吗?</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteTip = false">取 消</el-button>
                <el-button type="primary" @click="delLaw">确 定</el-button>
            </span>
        </el-dialog>
        <div class="law-left">
            <el-button @click="li = false;addDialog = true;clickEditem.url = false" type="primary" round>添加分类</el-button>
            <ul>
                <li :class="{activeLi: v.active}" @click="setActive(i)" v-for="(v,i) in laws">
                    <span>
                        <i>{{i+1}}</i>
                        <span> {{v.title}}</span>
                    </span>
                    <span class="actions">
                        <i @click="editLaw = Object.assign({},v);clickEditem = v;editDialog = true;" class="el-icon-edit"></i>
                        <i @click="deleteTip = true;clickEditem = v" class="el-icon-delete"></i>
                    </span>
                </li>
            </ul>
        </div>
        <div class="law-right">
            <el-button @click="li = true;addDialog = true;clickEditem.url = true" type="primary" round>添加分类</el-button>

            <ul>
                <li v-for="(v,i) in subLaws">
                    <span>
                        <i>{{i+1}}</i>
                        <span> {{v.title}}</span>
                    </span>
                    <span class="actions">
                        <i @click="editLaw = Object.assign({},v);clickEditem = v;clickEditem.index= i;editDialog = true" class="el-icon-edit"></i>
                        <i @click="deleteTip = true;clickEditem = v;clickEditem.index = i" class="el-icon-delete"></i>
                    </span>
                </li>

            </ul>
        </div>
        <el-dialog title="添加" :visible.sync="addDialog">
            <el-form class="edit-form">
                <el-input placeholder="请输入标题" v-model="addLaw.title" clearable></el-input>
                <el-input v-if="clickEditem.url" placeholder="请输入链接" v-model="addLaw.url" clearable>
                </el-input>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addDialog = false">取 消</el-button>
                <el-button type="primary" @click="addLi">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="编辑" :visible.sync="editDialog">
            <el-form class="edit-form">
                <el-input placeholder="请输入标题" v-model="editLaw.title" clearable></el-input>
                <el-input v-if="clickEditem.url" placeholder="请输入链接" v-model="editLaw.url" clearable>
                </el-input>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editDialog = false">取 消</el-button>
                <el-button type="primary" @click="editLi">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: "Law",
    data() {
        return {
            addDialog: false,
            editDialog: false,
            laws: [
            ],
            subLaws: [],
            activelaw: {},
            addLaw: {},
            editLaw: {},
            li: false,
            clickEditem: {},
            deleteTip: false
        }
    },
    methods: {
        setActive(i) {
            // this.laws[i].active = true
            if (this.laws[i]) {
                this.activelaw.active = false
                this.activelaw = this.laws[i]
                this.$set(this.laws[i], "active", true)
                this.subLaws = this.laws[i].children
                // this.subLaws.forEach(v => {
                //     v.parent = this.laws[i]
                // })
            }
        },
        async addLi() {
            let li = this.li
            let payload = {
                title: this.addLaw.title,
                url: this.addLaw.url,
                children: []
            }
            li ? payload.Id = li.Id : null
            let res
            if (this.clickEditem.url) {
                this.activelaw.children.push({
                    title: this.addLaw.title,
                    url: this.addLaw.url,
                })
                res = await $http.put("/laws", this.activelaw)
            } else {
                res = await $http.post("/laws", payload)

            }
            if (res.data.ok) {
                this.$message({
                    message: '添加成功',
                    type: 'success',
                    duration: 1000
                });
                this.addDialog = false
                this.getLaws()
                this.addLaw = {}
            } else {
                this.$message.error('添加失败');
            }

        },
        async editLi() {
            let res
            if (this.clickEditem.index || this.clickEditem.index == 0) {
                this.activelaw.children[this.clickEditem.index] = this.editLaw
            } else {
                this.activelaw.title = this.editLaw.title
            }
            res = await $http.put("/laws", this.activelaw)
            if (res.data.ok) {
                this.$message({
                    message: '编辑成功',
                    type: 'success',
                    duration: 1000
                });
                this.editDialog = false
                this.getLaws()
                this.editLaw = {}
            } else {
                this.$message.error('添加失败');
            }
        },
        async delLaw() {
            let res
            if (this.clickEditem.index || this.clickEditem.index == 0) {
                this.activelaw.children.splice(this.clickEditem.index, 1)
                res = await $http.put("/laws", this.activelaw)
            } else {
                res = await $http.delete("/laws/" + this.clickEditem.Id)
            }
            if (res.data.ok) {
                this.deleteTip = false
                this.$message({
                    message: '删除成功',
                    type: 'success',
                    duration: 1000
                });
                this.getLaws()
            } else {
                this.$message.error('删除失败');
            }
        },
        async getLaws() {
            let res = await $http.get("/laws")
            let activeId = this.activelaw.active ? this.activelaw.Id : null
            this.laws = res.data.data
            if (activeId) {
                this.laws.forEach((v, i) => {
                    if (v.Id == activeId) {
                        this.setActive(i)
                    }
                })
            }

        }
    },
    mounted: async function() {
        await this.getLaws()
        this.setActive(0)
    }
}
</script>
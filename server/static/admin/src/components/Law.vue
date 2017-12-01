<style lang="less">
    .law-container{
        display: flex;
        height: 100%;
        .law-left{
            flex: 1;
            border-right: 1px solid #b4bccc;
            li{
                cursor: pointer;
            }
        }
        .law-right{
            flex: 1;
        }
        .activeLi{
            background: #607D8B
        }
    }
</style>
<template>
    <div class="law-container">
        <div class="law-left">
            <ul>
                <li :class="{activeLi: v.active}" @click="setActive(v,i)" v-for="(v,i) in laws">
                    {{v.title}}
                </li>
            </ul>
        </div>
        <div class="law-right">
            <ul>
                <li  v-for="(v,i) in activelaw">
                    {{v.title}}
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        name: "Law",
        data(){
            return{
                laws: [
                    {
                        title: "第一个",
                        url: "",
                        // active: false,
                        children: [
                            {
                                title:"子"
                            }
                        ]
                    }
                ],
                activelaw: []
            }
        },
        methods:{
            setActive(v,i){
                // this.laws[i].active = true
                this.$set(this.laws[i],"active",true)
                this.activelaw = v.children
            }
        },
        mounted:function(){

        }
    }
</script>
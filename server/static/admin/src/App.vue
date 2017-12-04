<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang=less>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
  height: 100vh;
  width: 100vw;
}
.el-tabs__header{
  margin-bottom: 0 !important;
  height: 51px !important;
  padding-left: 30px !important;
  >div{
    height: 100% !important;
    >div{
      height: 100% !important;
    }
  }
  .el-tabs__nav{
    height: 100% !important;
  }
  .el-tabs__item{
    height: 100% !important;
  }
}
</style>

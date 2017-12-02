// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from './tool/axios'
import "lodash"

Vue.use(ElementUI)
Vue.prototype.$http = axios

Vue.config.productionTip = false
window.$globalThis = Vue.prototype
Vue.prototype.showTip = function(){

}
Vue.prototype.redirectToLogin = function(data) {
  if (data.needAuth) {
    console.log("需要重新登录")
    this.$message({
      showClose: true,
      message: '需要重新登录',
      type: 'warning',
      duration: 1000
  });
    setTimeout(function(){
      window.location.href = "/login"

    }, 500);
  }
},
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

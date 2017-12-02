import http from 'axios'

let axios = http.create({})
axios.interceptors.response.use(function (res) {
    $globalThis.redirectToLogin(res.data)
    return res
  }, function (error) {
    // $globalThis.$Message.error("请求错误")
    return Promise.reject(error)
  })
window.$http = axios
export default axios
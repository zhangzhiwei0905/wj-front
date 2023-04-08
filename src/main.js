// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import vueAxios from 'vue-axios'
import ElementUI from 'element-ui'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import qs from 'qs'


// axios.defaults.baseURL = 'http://139.9.149.92:8088/api'
axios.defaults.baseURL = 'http://localhost:8088/api'

Vue.use(vueAxios, axios)
Vue.use(ElementUI)
Vue.use(qs)
Vue.config.productionTip = false

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
router.beforeEach((to, from, next) => {
//to.name是登录路由的名字
  if (to.name === 'Login' || to.name === 'Register') {
    next()
  } else {
    //token思路就是登录成功之后保存起来，然后下面拿来用
    let token = sessionStorage.getItem("token")
    //判断token是否已经保存了
    if (token) {
      //成功跳转
      next()
    } else {
      Vue.prototype.$message({
        type: "error",
        message: "请先登录"
      });
      next('/')
    }
  }
})


/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  components: {App},
  template: '<App/>'
})
global.vm = vm

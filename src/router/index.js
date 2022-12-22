import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// 配置自己路由表
const routes = [
  {
    path: '/',
    // 懒加载页面
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    // 懒加载页面
    component: () => import('../views/login/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router

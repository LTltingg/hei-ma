import Vue from 'vue'
// 引入根组件
import App from './App.vue'
// 引入路由
import router from './router'
import store from './store'
// 引入want组件
import Vant from 'vant'
import 'vant/lib/index.css'
// 引入图表
import './styles/index.less'
// 加载动态设置rem基准值
// 首先npm install amfe-flexible
// 其次在main.js中引入
// 接着npm i postcess-pxtorem
// 最后根目录新建.postcssrc.js文件 里面写上van官网中进阶用法中rem适配中的内容
import 'amfe-flexible'
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

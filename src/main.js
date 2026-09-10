import Vue from 'vue'
import App from './App.vue'
// 引入ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI) //全局注册所有element组件，el-pagination就能识别了

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
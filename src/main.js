import Vue from 'vue'
import App from './App.vue'
import './assembly/Element'
import {MessageBox,Message} from 'element-ui';
Vue.prototype.$confirm   =MessageBox.confirm
Vue.prototype.$message   =Message

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

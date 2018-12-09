import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VR from 'vue-resource'
import * as _ from 'lodash';


Vue.use(_);
Vue.use(VR);

Vue.http.options.root = 'https://syn.su/';
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

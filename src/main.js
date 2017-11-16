// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {sync} from 'vuex-router-sync';
import router from './router'
import store from './store';
import axios from 'axios';

sync(store, router);

axios.defaults.baseURL = 'http://localhost:3000/v1/api';

Vue.config.productionTip = false

export const eventBus = new Vue({});

Object.defineProperties(Vue.prototype, {
  http: {
    get() {
      return axios;
    }
  },

  '$http': {
    get() {
      return axios;
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

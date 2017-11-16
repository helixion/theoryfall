import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/GroupBuilder9.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
})

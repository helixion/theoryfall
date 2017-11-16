import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

const generateList = id => () => import('../components/generateList').then(m => m.default(id));

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    },
    {
      path: '/manage/powers',
      component: generateList('powers')
    },
    {
      path: '/manage/powers/page/:page(\\d+)',
      component: generateList('powers')
    }
  ]
})

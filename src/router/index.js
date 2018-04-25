import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main'
import Dota from '@/components/dota'
import Cartoon from '@/components/cartoon'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
    },
    {
      path: '/main',
      name: 'main',
      component: Main
    },
    {
      path: '/dota',
      name: 'dota',
      component: Dota
    },
    {
      path: '/cartoon',
      name: 'cartoon',
      component: Cartoon
    }
  ]
})

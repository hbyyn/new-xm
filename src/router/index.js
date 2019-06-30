import Vue from 'vue'
import Router from 'vue-router'
import homeRoute from './home'
import materialsRoute from './materials'
import orderRoute from './order'
import repairRoute from './repair'
import workRoute from './worker'

Vue.use(Router)
const routes= [
  homeRoute,
  materialsRoute,
  orderRoute,
  repairRoute,
  workRoute,
  {
    path: '/',
    redirect: '/home'
  }
  // {
  //   path: '**',
  //   redirect: '/home'
  // }
]

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

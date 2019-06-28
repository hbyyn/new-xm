import Vue from 'vue'
import Router from 'vue-router'
import homeRoute from './home'
import materiallsRoute from './materialls'
import productRoute from './product'
import clientRoute from './client'

Vue.use(Router)
const routes= [
  homeRoute,
  materiallsRoute,
  productRoute,
  clientRoute,
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

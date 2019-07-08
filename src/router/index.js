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
  },
  {
    path:'/register',
    component: () => import("../components/Register")
  },
  {
    path:'/login',
    component: () => import("../components/Login")
  }
  // {
  //   path: '**',
  //   redirect: '/home'
  // }
]
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next) => {
  let clint_id=sessionStorage.getItem('clint_id')
  let username=sessionStorage.getItem('username')
  if(to.path !== '/login' && !clint_id&& !username){
    next({
      path:'/login'
    })
  }else{
      next()
  }
})


export default router

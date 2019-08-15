import Vue from 'vue'
import Router from 'vue-router'
import homeRoute from './home'
import materialsRoute from './materials'
import orderRoute from './order'
import repairRoute from './repair'
import workRoute from './worker'
// import settingRoute from './setting'

Vue.use(Router)
const routes= [
  homeRoute,
  materialsRoute,
  orderRoute,
  repairRoute,
  workRoute,
  // settingRoute,
  {
    path: '/',
    redirect: '/home/home'
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
  let client_id=sessionStorage.getItem('client_id')
  let username=sessionStorage.getItem('username')
  if(to.path !== '/login' && to.path !== '/register' && ! client_id && !username){
    next({
      path:'/login'
    })
  }else{
      next()
  }
})



export default router

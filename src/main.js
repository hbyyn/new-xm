import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import axios from "axios";
import 'element-ui/lib/theme-chalk/index.css';


Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.getConfigJson=function(){
  axios.get("/static/config.json").then((result)=>{
      //sessionStorage存储ApiUrl
      sessionStorage.setItem("CONFIG_HOST", result.data.CONFIG_HOST);
  }).catch((error)=>{console.log(error)});
}



new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

// router.beforeEach((to,from,next) => {
//   let list=store.getters.use_role.map((item)=>{
//     const arr=[]
//     arr.push(item.url)
//     return arr
//   })
//   console.log(list)
//   next()
// })

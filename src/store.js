import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home'
import goods from './modules/goods'
import category from './modules/category'

Vue.use(Vuex);


const store = new Vuex.Store({
    modules: {
        home,
        goods,
        category
    }
});


export default store;
import Vue from "vue";
import Vuex from "vuex";
import getters from './getters'
import format from "./modules/format";
import materials from "./modules/materials";
import product from "./modules/product";
import supplier from "./modules/supplier";
import mrepair from "./modules/mrepair";
import repair from "./modules/repair";
import orderproduct from "./modules/orderproduct";
import order from "./modules/order";
import customers from "./modules/customers";
import work from "./modules/work";
import mwork from "./modules/mwork";
import setting from "./modules/setting"
import role from "./modules/role"
import user from "./modules/user"

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    format,
    materials,
    product,
    supplier,
    mrepair,
    repair,
    orderproduct,
    order,
    customers,
    work,
    mwork,
    setting,
    role,
    user
  },
  getters
});

export default store;

import Vue from "vue";
import Vuex from "vuex";
import format from "./modules/format";
import materials from "./modules/materials";
import product from "./modules/product";
import supplier from "./modules/supplier";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    format,
    materials,
    product,
    supplier
  }
});

export default store;

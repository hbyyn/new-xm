// 废弃


import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const state = {
  all:{
    list: [],
    FromData: {
      clint_id: "",
      material_id: "",
      material_type: "",
      material_name: "",
      format_id: "",
      material_unit: "",
      supplier_id:"",
      material_erpid: "",
      material_indate: "",
      material_storeid: "",
      material_operaterid: "",
      material_operaterdate: "",
      parent_id: "",
      //规划
      format_name: "",
      //供应商
      supplier_name: "",
      supplier_tel: "",
      supplier_address: "",
      supplier_fax: "",
      //产品表
      product_id: "",
      product_name: "",
      product_color:"",
      product_desc: "",

      clint_creator: "",
      clint_createtime: "",
      clint_updator: "",
      clint_updatetime: ""
    }, //弹窗,
    total: 10 //list数据数量
  },
  changeIndex: "",
  Fromadd: ""
};
const mutations = {
  setFromadd(state,param){
    state.Fromadd=param
  },
  setChangeIndex(state,param){
    state.changeIndex=param
  },
  //增
  rowAddStore(state) {
    state.all.list.unshift(state.Fromadd);
  },
  //改
  pwdChange(state) {
    state.all.list.splice(state.changeIndex, 1, state.Fromadd);
  }
};




const store = new Vuex.Store({
  state,
  mutations
});

export default store;

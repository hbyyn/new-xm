
const state = {
  all:{
    list: [],
    FromData: {
      clint_id: "",
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




export default {
    namespaced: true,
    state,
    mutations

}

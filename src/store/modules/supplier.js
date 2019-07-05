const state = {
  all:{
    list: [],
    FromData: {
      clint_id: "",
      supplier_id:"",
      //供应商
      supplier_name: "",
      supplier_tel: "",
      supplier_address: "",
      supplier_fax: "",

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

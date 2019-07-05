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


const state = {
  all:{
    list: [{
      id:1,
      clint_id: "66",
      format_id: "66",
      //规划
      format_name: "BBBB",

      clint_creator: "66",
      clint_createtime: "66",
      clint_updator: "66",
      clint_updatetime: "66"
    }],
    FromData: {
      clint_id: "",
      format_id: "",
      //规划
      format_name: "",

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


const state = {
  tableData:{
    list: [{
      clint_id: "88",
      //产品表
      product_id: "88",
      product_name: "SSSS",
      product_color:"88",
      product_desc: "88",

      clint_creator: "88",
      clint_createtime: "88",
      clint_updator: "88",
      clint_updatetime: "88"
    }],
    columns: [
      { id: 1, prop: 'clint_id', label: "公司编号" },
      { id: 2, prop: 'product_id', label: "产品编号" },
      { id: 3, prop: 'product_name', label: "产品名称" },
      { id: 4, prop: 'product_color', label: "产品颜色" },
      { id: 5, prop: 'product_desc', label: "产品描述" },
      { id: 14, prop: 'clint_creator', label: "创建人" },
      { id: 15, prop: 'clint_createtime', label: "创建时间" },
      { id: 16, prop: 'clint_updator', label: "修改人" },
      { id: 17, prop: 'clint_updatetime', label: "修改时间" }
    ],
    FromData: {
      clint_id: "88+",
      //产品表
      product_id: "88+",
      product_name: "SSSS+",
      product_color:"88+",
      product_desc: "88+",

      clint_creator: "88+",
      clint_createtime: "88+",
      clint_updator: "88+",
      clint_updatetime: "88+"
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
    state.tableData.list.unshift(state.Fromadd);
  },
  //改
  pwdChange(state) {
    state.tableData.list.splice(state.changeIndex, 1, state.Fromadd);
  }
};




export default {
    namespaced: true,
    state,
    mutations

}

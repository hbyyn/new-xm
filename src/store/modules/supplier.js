const state = {
  tableData:{
    list: [{
      clint_id: "22",
      supplier_id:"333",
      //供应商
      supplier_name: "DDD",
      supplier_tel: "333",
      supplier_address: "333",
      supplier_fax: "333",

      clint_creator: "333",
      clint_createtime: "333",
      clint_updator: "333",
      clint_updatetime: "333"
    }],
    columns: [
      { id: 1, prop: 'clint_id', label: "公司编号" },
      { id: 2, prop: 'supplier_id', label: "供应商编号" },
      { id: 3, prop: 'supplier_name', label: "供应商名称" },
      { id: 4, prop: 'supplier_tel', label: "供应商电话" },
      { id: 5, prop: 'supplier_address', label: "供应商地址" },
      { id: 6, prop: 'supplier_fax', label: "供应商传真" },
      { id: 14, prop: 'clint_creator', label: "创建人" },
      { id: 15, prop: 'clint_createtime', label: "创建时间" },
      { id: 16, prop: 'clint_updator', label: "修改人" },
      { id: 17, prop: 'clint_updatetime', label: "修改时间" }
    ],
    FromData: {
      clint_id: "22+",
      supplier_id:"333+",
      //供应商
      supplier_name: "DDD+",
      supplier_tel: "333+",
      supplier_address: "333+",
      supplier_fax: "333+",

      clint_creator: "333+",
      clint_createtime: "333+",
      clint_updator: "333+",
      clint_updatetime: "333+"
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

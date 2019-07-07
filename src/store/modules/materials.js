const state = {
  tableData:{
    list: [],
    columns: [
      { id: 1, prop: 'clint_id', label: "公司编号" },
      { id: 2, prop: 'material_id', label: "物料编号" },
      { id: 3, prop: 'material_type', label: "物料类型" },
      { id: 4, prop: 'material_name', label: "物料名称" },
      { id: 13, prop: 'format_id', label: "规格编号" },
      { id: 5, prop: 'material_unit', label: "物料单位" },
      { id: 6, prop: 'supplier_id', label: "供应商编号" },
      { id: 7, prop: 'material_erpid', label: "ERP-编号" },
      { id: 8, prop: 'material_indate', label: "EPR入库日期" },
      { id: 9, prop: 'material_storeid', label: "EPR入库编号" },
      { id: 10, prop: 'material_operaterid', label: "材料操作员编号" },
      { id: 11, prop: 'material_operaterdate', label: "材料操作日期" },
      { id: 18, prop: 'product_id', label: "产品编号" },
      { id: 12, prop: 'parent_id', label: "父级编号" },
      { id: 14, prop: 'clint_creator', label: "创建人" },
      { id: 15, prop: 'clint_createtime', label: "创建时间" },
      { id: 16, prop: 'clint_updator', label: "修改人" },
      { id: 17, prop: 'clint_updatetime', label: "修改时间" }
    ],
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
      product_id:'',
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

import Date from "../time"


const state = {
  tableData: {
    list: [{
      client_id: "xxx",
      material_id: "xxx",
      material_type: "xxx",
      material_name: "xxx",
      format_id: "xxx",
      material_unit: "xxx",
      supplier_id: "xxx",
      material_erpid: "xxx",
      material_indate: "xxx",
      material_storeid: "xxx",
      material_operaterid: "xxx",
      material_operaterdate: "xxx",
      product_id: "xxx",
      parent_id: "xxx",

      client_creator: "xxx",
      client_createtime: "xxx",
      client_updator: "",
      client_updatetime: ""
    }],
    columns: [
      { id: 1, prop: "client_id", label: "公司编号" },
      { id: 2, prop: "material_id", label: "物料编号" },
      { id: 3, prop: "material_type", label: "物料类型" },
      { id: 4, prop: "material_name", label: "物料名称" },
      { id: 13, prop: "format_id", label: "规格编号" },
      { id: 5, prop: "material_unit", label: "物料单位" },
      { id: 6, prop: "supplier_id", label: "供应商编号" },
      { id: 7, prop: "material_erpid", label: "ERP编号" },
      { id: 8, prop: "material_indate", label: "EPR入库日期" },
      { id: 9, prop: "material_storeid", label: "EPR入库编号" },
      { id: 10, prop: "material_operaterid", label: "领料人" },
      { id: 11, prop: "material_operaterdate", label: "领料时间" },
      { id: 12, prop: "parent_id", label: "父级编号" },
      { id: 18, prop: "product_id", label: "产品编号" },
      { id: 14, prop: "client_creator", label: "创建人" },
      { id: 15, prop: "client_createtime", label: "创建时间" },
      { id: 16, prop: "client_updator", label: "修改人" },
      { id: 17, prop: "client_updatetime", label: "修改时间" }
    ],
    FromData: {
      client_id: "",
      material_id: "",
      material_type: "",
      material_name: "",
      format_id: "",
      material_unit: "",
      supplier_id: "",
      material_erpid: "",
      material_indate: "",
      material_storeid: "",
      material_operaterid: "",
      material_operaterdate: "",
      product_id: "",
      parent_id: "",

      client_creator: "",
      client_createtime: "",
      client_updator: "",
      client_updatetime: ""
    },
  },
  changeIndex: "",
  Fromadd: "",
  nowTime:"",
};
const mutations = {
  setNowTime(state) {

    state.nowTime =(new Date()).Format("yyyy-MM-dd hh:mm:ss")
  },
  setFromadd(state, param) {
    state.Fromadd = param;
  },
  setChangeIndex(state, param) {
    state.changeIndex = param;
  },
  //增
  rowAddStore(state) {
    state.Fromadd.client_id = sessionStorage.getItem("client_id");
    state.Fromadd.client_creator = sessionStorage.getItem("user_name");
    state.Fromadd.client_createtime = state.nowTime
    state.tableData.list.unshift(state.Fromadd);

  },
  rowRemoveStore(state,param){
    state.tableData.list=state.tableData.list.filter( item=>(param.indexOf(item) < 0))
  },
  //改
  pwdChange(state) {
    state.Fromadd.client_updator = sessionStorage.getItem("user_name");
    state.Fromadd.client_updatetime = state.nowTime
    state.tableData.list.splice(state.changeIndex, 1, state.Fromadd);
  }
};

export default {
  namespaced: true,
  state,
  mutations
};

import Date from "../time"

const state = {
  tableData:{
    list: [{
      id:1,
      client_id: "66",
      format_id: "66",
      //规划
      format_name: "BBBB",

      client_creator: "66",
      client_createtime: "66",
      client_updator: "66",
      client_updatetime: "66"
    }],
    columns: [
      { id: 1, prop: 'client_id', label: "公司编号" },
      { id: 2, prop: 'format_id', label: "规格编号" },
      { id: 3, prop: 'format_name', label: "规格名称" },
      { id: 14, prop: 'client_creator', label: "创建人" },
      { id: 15, prop: 'client_createtime', label: "创建时间" },
      { id: 16, prop: 'client_updator', label: "修改人" },
      { id: 17, prop: 'client_updatetime', label: "修改时间" }
    ],
    formData: {
      client_id: "",
      format_id: "",
      format_name: "",
      client_creator: "",
      client_createtime: "",
      client_updator: "",
      client_updatetime: ""
    },
    formInit: {
      client_id: "",
      format_id: "",
      format_name: "",
      client_creator: "",
      client_createtime: "",
      client_updator: "",
      client_updatetime: ""
    },
  },
  changeIndex: "",
  formadd: "",
  nowTime:"",
};
const mutations = {
  setNowTime(state) {
    state.nowTime =(new Date()).Format("yyyy-MM-dd hh:mm:ss")
  },
  setformadd(state, param) {
    state.formadd = param;
    state.tableData.formData={...state.tableData.formInit}
  },
  setChangeIndex(state, param) {
    state.changeIndex = param;
  },
  //增
  rowAddStore(state) {
    state.formadd.client_id = sessionStorage.getItem("client_id");
    state.formadd.client_creator = sessionStorage.getItem("user_name");
    state.formadd.client_createtime = state.nowTime
    state.tableData.list.unshift(state.formadd);
  },
  rowRemoveStore(state,param){
    state.tableData.list=state.tableData.list.filter( item=>(param.indexOf(item) < 0))
  },
  //改
  pwdChange(state) {
    state.formadd.client_updator = sessionStorage.getItem("user_name");
    state.formadd.client_updatetime = state.nowTime
    state.tableData.list.splice(state.changeIndex, 1, state.formadd);
  }
};




export default {
    namespaced: true,
    state,
    mutations

}

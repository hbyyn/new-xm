import Date from "../time"

const state = {
  tableData:{
    list: [{
      client_id: "88",
      //产品表
      product_id: "88",
      product_name: "SSSS",
      product_color:"#536985",
      product_desc: "88",

      client_creator: "88",
      client_createtime: "88",
      client_updator: "88",
      client_updatetime: "88"
    }],
    columns: [
      { id: 1, prop: 'client_id', label: "公司编号" },
      { id: 2, prop: 'product_id', label: "产品编号" },
      { id: 3, prop: 'product_name', label: "产品名称" },
      { id: 4, prop: 'product_color', label: "产品颜色" },
      { id: 5, prop: 'product_desc', label: "产品描述" },
      { id: 14, prop: 'client_creator', label: "创建人" },
      { id: 15, prop: 'client_createtime', label: "创建时间" },
      { id: 16, prop: 'client_updator', label: "修改人" },
      { id: 17, prop: 'client_updatetime', label: "修改时间" }
    ],
    FromData: {
      client_id: "",
      //产品表
      product_id: "88+",
      product_name: "SSSS+",
      product_color:"",
      product_desc: "88+",

      client_creator: "",
      client_createtime: "",
      client_updator: "",
      client_updatetime: ""
    }, //弹窗,
    total: 10 //list数据数量
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
  //改
  pwdChange(state) {
    state.Fromadd.client_updator = sessionStorage.getItem("user_name");
    state.Fromadd.client_updatetime = state.nowTime
    state.tableData.list.splice(state.changeIndex, 1, state.Fromadd);
  }
}



export default {
    namespaced: true,
    state,
    mutations

}

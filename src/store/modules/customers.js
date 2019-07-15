import Date from "../time"


const state = {
  tableData: {
    list: [
      {
        client_id: "w737474",
        customers_id: "o277178",
        customers_name: "朱丽",
        customers_tel: "13723460272",
        customers_address: "贵州省 贵阳市 观山湖区",
        customers_fax: "0634692",
        client_creator: "jj-56",
        client_createtime: "2016/05/03/14:06:55",
        client_updator: "jj-57",
        client_updatetime: "2016/05/03/14:16:55"
      }
    ],
    columns: [
      { id: 1, prop: "client_id", label: "公司编号" },
      { id: 2, prop: "customers_id", label: "客户编号" },
      { id: 3, prop: "customers_name", label: "客户姓名" },
      { id: 4, prop: "customers_tel", label: "客户电话" },
      { id: 5, prop: "customers_address", label: "客户地址" },
      { id: 6, prop: "customers_fax", label: "客户传真" },
      { id: 14, prop: "client_creator", label: "创建人" },
      { id: 15, prop: "client_createtime", label: "创建时间" },
      { id: 16, prop: "client_updator", label: "修改人" },
      { id: 17, prop: "client_updatetime", label: "修改时间" }
    ],
    FromData: {
      client_id: "",
      customers_id: "",
      customers_name: "",
      customers_tel: "",
      customers_address: "",
      customers_fax: "",
      client_creator: "",
      client_createtime: "",
      client_updator: "",
      client_updatetime: ""
    }


  },
  changeIndex: "",
  Fromadd: "",
  nowTime: ""
};
const mutations = {
  setNowTime(state) {
    state.nowTime = new Date().Format("yyyy-MM-dd hh:mm:ss");
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
    state.Fromadd.client_createtime = state.nowTime;
    state.tableData.list.unshift(state.Fromadd);
  },
  //改
  pwdChange(state) {
    state.Fromadd.client_updator = sessionStorage.getItem("user_name");
    state.Fromadd.client_updatetime = state.nowTime;
    state.tableData.list.splice(state.changeIndex, 1, state.Fromadd);
  }
};

export default {
  namespaced: true,
  state,
  mutations
};

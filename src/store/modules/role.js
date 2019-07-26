import Date from "../time";

const state = {
  tableData: {
    list: [
      {
        client_id: "22",
        role_id: "a111",
        role_name: "超级管理员",
        role_power: '',
        client_creator: "jj-56",
        client_createtime: "2016/05/03/14:06:55",
        client_updator: "jj-57",
        client_updatetime: "2016/05/03/14:16:55"
      },
      {
        client_id: "212",
        role_id: "a222",
        role_name: "管理员",
        role_power:'',
        client_creator: "jj-5",
        client_createtime: "2016/05/03/14:06:45",
        client_updator: "jj-55",
        client_updatetime: "2016/05/03/14:16:58"
      },
      {
        client_id: "2127",
        role_id: "v777",
        role_name: "小明",
        role_power:'',
        client_creator: "jj-85",
        client_createtime: "2016/05/03/14:06:35",
        client_updator: "jj-75",
        client_updatetime: "2016/05/03/14:16:18"
      },
    ],
    columns: [
      { id: 1, prop: "role_id", label: "角色编号" },
      { id: 7, prop: "role_name", label: "角色名称" },
      { id: 14, prop: "client_creator", label: "创建人" },
      { id: 15, prop: "client_createtime", label: "创建时间" },
      { id: 16, prop: "client_updator", label: "修改人" },
      { id: 17, prop: "client_updatetime", label: "修改时间" }
    ],
    formData: {
      client_id: "",
      role_id: "",
      role_name: "",
      role_power:'',
      client_creator: "",
      client_createtime: "",
      client_updator: "",
      client_updatetime: ""
    } //弹窗,
  },
  changeIndex: "",
  formadd: "",
  nowTime: ""
};
const mutations = {
  //权限
  setRolePower(satate,param){
    satate.tableData.list[state.changeIndex].role_power=param
  },

  //
  setNowTime(state) {
    state.nowTime = new Date().Format("yyyy-MM-dd hh:mm:ss");
  },
  setformadd(state, param) {
    state.formadd = param;
  },
  setChangeIndex(state, param) {
    state.changeIndex = param;
  },
  //增
  rowAddStore(state) {
    state.formadd.client_id = sessionStorage.getItem("client_id");
    state.formadd.client_creator = sessionStorage.getItem("user_name");
    state.formadd.client_createtime = state.nowTime;
    state.tableData.list.unshift(state.formadd);
  },
  rowRemoveStore(state, param) {
    state.tableData.list = state.tableData.list.filter(
      item => param.indexOf(item) < 0
    );
  },
  //改
  pwdChange(state) {
    state.formadd.client_updator = sessionStorage.getItem("user_name");
    state.formadd.client_updatetime = state.nowTime;
    state.tableData.list.splice(state.changeIndex, 1, state.formadd);
  }
};

export default {
  namespaced: true,
  state,
  mutations
};

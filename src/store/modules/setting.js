import Date from "../time"

const state = {
  tableData:{
    list: [{
      login_id: 'a555',
      login_name: 'c222',
      login_acode: 'zcdfafaf',
      client_creator: 'jj-56',
      client_createtime: '2016/05/03/14:06:55',
      client_updator: 'jj-57',
      client_updatetime: '2016/05/03/14:16:55'
    }],
    columns: [
      {id:1,prop:'login_id',label:"用户编号"},
      {id:7,prop:'login_name',label:"用户名称"},
      {id:2,prop:'login_acode',label:"安全码"},
      { id: 14, prop: 'client_creator', label: "创建人" },
      { id: 15, prop: 'client_createtime', label: "创建时间" },
      { id: 16, prop: 'client_updator', label: "修改人" },
      { id: 17, prop: 'client_updatetime', label: "修改时间" }
      ],
    FromData: {
      login_id: '',
      login_name: '',
      login_acode: '',
      client_creator: '',
      client_createtime: '',
      client_updator: '',
      client_updatetime: ''
    }, //弹窗,
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
};




export default {
    namespaced: true,
    state,
    mutations

}



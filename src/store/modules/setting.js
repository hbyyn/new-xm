import Date from "../time"

const state = {
  tableData:{
    list: [{
      client_id: "22",
      login_id: 'a555',
      login_name: 'admin',
      role_id:{role_name:' '},
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
      {id:3,prop:'role_id.role_name',label:"权限选择"},
      { id: 14, prop: 'client_creator', label: "创建人" },
      { id: 15, prop: 'client_createtime', label: "创建时间" },
      { id: 16, prop: 'client_updator', label: "修改人" },
      { id: 17, prop: 'client_updatetime', label: "修改时间" }
      ],
    formData: {
      client_id: "",
      login_id: '',
      login_name: '',
      login_acode: '',
      role_id:{role_name:''},
      client_creator: '',
      client_createtime: '',
      client_updator: '',
      client_updatetime: ''
    }, //弹窗,
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



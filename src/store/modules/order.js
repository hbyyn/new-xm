import Date from "../time"


const state = {
  tableData:{
    list: [{
      client_id: 'a555',
      order_id: '6564564',
      customers_id: 'b546',
      order_date: '2016/05/03',
      order_outdate: '2016/06/03',
      client_creator: 'jj-56',
      client_createtime: '2016/05/03/14:06:55',
      client_updator: 'jj-57',
      client_updatetime: '2016/05/03/14:16:55'
    }],
    columns: [
      { id: 1, prop: 'client_id', label: "公司编号" },
      { id: 2, prop: 'order_id', label: "订购编号" },
      { id: 3, prop: 'customers_id', label: "客户编号" },
      { id: 4, prop: 'order_date', label: "订购时间" },
      { id: 5, prop: 'order_outdate', label: "订单过时" },
      { id: 14, prop: 'client_creator', label: "创建人" },
      { id: 15, prop: 'client_createtime', label: "创建时间" },
      { id: 16, prop: 'client_updator', label: "修改人" },
      { id: 17, prop: 'client_updatetime', label: "修改时间" }
    ],
    FromData: {
      client_id: '',
      order_id: '6564564+',
      customers_id: 'b546+',
      order_date: '',
      order_outdate: '',
      client_creator: '',
      client_createtime: '',
      client_updator: '',
      client_updatetime: ''
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
    state.Fromadd.client_updator = ''
    state.Fromadd.client_updatetime =''
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

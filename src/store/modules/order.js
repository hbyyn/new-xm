
const state = {
  tableData:{
    list: [{
      clint_id: 'a555',
      order_id: '6564564',
      customers_id: 'b546',
      order_date: '2016/05/03',
      order_outdate: '2016/06/03',
      clint_creator: 'jj-56',
      clint_createtime: '2016/05/03/14:06:55',
      clint_updator: 'jj-57',
      clint_updatetime: '2016/05/03/14:16:55'
    }],
    columns: [
      { id: 1, prop: 'clint_id', label: "公司编号" },
      { id: 2, prop: 'order_id', label: "订购编号" },
      { id: 3, prop: 'customers_id', label: "客户编号" },
      { id: 4, prop: 'order_date', label: "订购时间" },
      { id: 5, prop: 'order_outdate', label: "订单过时" },
      { id: 14, prop: 'clint_creator', label: "创建人" },
      { id: 15, prop: 'clint_createtime', label: "创建时间" },
      { id: 16, prop: 'clint_updator', label: "修改人" },
      { id: 17, prop: 'clint_updatetime', label: "修改时间" }
    ],
    FromData: {
      clint_id: 'a555+',
      order_id: '6564564+',
      customers_id: 'b546+',
      order_date: '2016/05/03+',
      order_outdate: '2016/06/03+',
      clint_creator: 'jj-56+',
      clint_createtime: '2016/05/03/14:06:55+',
      clint_updator: 'jj-57+',
      clint_updatetime: '2016/05/03/14:16:55+'
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

const state = {
  tableData:{
    list: [{
      clint_id: 'a555',
      work_id: 'c222',
      work_name: '李四',
      work_desc: '打豆豆',
      clint_creator: 'jj-56',
      clint_createtime: '2016/05/03/14:06:55',
      clint_updator: 'jj-57',
      clint_updatetime: '2016/05/03/14:16:55'
    }],
    columns: [
      {id:1,prop:'clint_id',label:"公司编号"},
      {id:7,prop:'work_id',label:"工序编号"},
      {id:2,prop:'work_name',label:"工序名称"},
      {id:8,prop:'work_desc',label:"工作描述"},
      { id: 14, prop: 'clint_creator', label: "创建人" },
      { id: 15, prop: 'clint_createtime', label: "创建时间" },
      { id: 16, prop: 'clint_updator', label: "修改人" },
      { id: 17, prop: 'clint_updatetime', label: "修改时间" }
      ],
    FromData: {
      clint_id: 'a555+',
      work_id: 'c222+',
      work_name: '李四+',
      work_desc: '打豆豆+',
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

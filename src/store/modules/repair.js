const state = {
  tableData:{
    list: [{
      clint_id: 'a555',
      repair_id: 'e12315',
      repair_name: 'xxxxx',
      repair_desc: 'xxxxxxx',
      alcohol_creator: 'jj-56',
      alcohol_createtime: '2016/05/03/14:06:55',
      alcohol_updator: 'jj-57',
      alcohol_updatetime: '2016/05/03/14:16:55'
    }],
    columns: [
      {id:1,prop:'clint_id',label:"公司编号"},
      {id:2,prop:'repair_id',label:"返修编号"},
      {id:6,prop:'repair_name',label:"返修名称"},
      {id:7,prop:'repair_desc',label:"修理说明"},
      { id: 14, prop: 'alcohol_creator', label: "创建人" },
      { id: 15, prop: 'alcohol_createtime', label: "创建时间" },
      { id: 16, prop: 'alcohol_updator', label: "修改人" },
      { id: 17, prop: 'alcohol_updatetime', label: "修改时间" }
      ],
    FromData: {
        clint_id: 'a555+',
        repair_id: 'e12315+',
        repair_name: 'xxxxxxx+',
        repair_desc: 'xxxxxxx+',
        alcohol_creator: 'jj-56+',
        alcohol_createtime: '2016/05/03/14:06:55+',
        alcohol_updator: 'jj-57+',
        alcohol_updatetime: '2016/05/03/14:16:55+'
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

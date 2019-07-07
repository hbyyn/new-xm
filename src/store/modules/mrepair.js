
const state = {
  tableData:{
    list: [{
      clint_id: 'a555',
      material_id: 'b546',
      repair_id: 'e12315',
      material_repair_begindate: '2019-05-07',
      material_repair_enddate: '2019-06-07',
      clint_creator: 'jj-56',
      clint_createtime: '2016/05/03/14:06:55',
      clint_updator: 'jj-57',
      clint_updatetime: '2016/05/03/14:16:55'
    }],
    columns:[
      {id:1,prop:'clint_id',label:"公司编号"},
      {id:2,prop:'material_id',label:"材料编号"},
      {id:6,prop:'repair_id',label:"返修编号"},
      {id:7,prop:'material_repair_begindate',label:"维修启动日期"},
      {id:8,prop:'material_repair_enddate',label:"维修结束日期"},
      { id: 14, prop: 'clint_creator', label: "创建人" },
      { id: 15, prop: 'clint_createtime', label: "创建时间" },
      { id: 16, prop: 'clint_updator', label: "修改人" },
      { id: 17, prop: 'clint_updatetime', label: "修改时间" }
      ],
    FromData: {
      clint_id: 'a555+',
      material_id: 'b546+',
      repair_id: 'e12315+',
      material_repair_begindate: '2019-05-07+',
      material_repair_enddate: '2019-06-07+',
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

import { api, request } from "../../ajax";
import { Message } from 'element-ui';

const state = {
  tableData:{
    list: [
    //   {
    //   client_id: 'a555',
    //   material_id: 'b546',
    //   repair_id: 'e12315',
    //   material_repair_begindate: '2019-05-07',
    //   material_repair_enddate: '2019-06-07',
    //   client_creator: 'jj-56',
    //   client_createtime: '2016/05/03/14:06:55',
    //   client_updator: 'jj-57',
    //   client_updatetime: '2016/05/03/14:16:55'
    // }
  ],
    columns:[
      // {id:1,prop:'client_id',label:"公司编号"},
      {id:2,prop:'material_id',label:"物料编号"},
      {id:6,prop:'repair_id',label:"返修编号"},
      {id:7,prop:'material_repair_begindate',label:"维修启动日期"},
      {id:8,prop:'material_repair_enddate',label:"维修结束日期"},
      { id: 21, prop: "material_repair_meno", label: "备注" },
      { id: 14, prop: 'client_creator', label: "创建人" },
      { id: 15, prop: 'client_createtime', label: "创建时间" },
      { id: 16, prop: 'client_updator', label: "修改人" },
      { id: 17, prop: 'client_updatetime', label: "修改时间" }
      ],
    formData: {
      client_id: '',
      material_id: '',
      repair_id: '',
      material_repair_begindate: '',
      material_repair_enddate: '',
      material_repair_meno:'',
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
  setformadd(state, param) {
    state.formadd = param;
  },
  setChangeIndex(state, param) {
    state.changeIndex = param;
  },
  setList(state, param) {
    state.tableData.list = param;
    console.log(state.tableData.list)
  }
};

const actions = {
  // 获取list数据
  async getListAction(context) {
    let result = await request.post(api.MATERIALSREPAIR_SELECT_API);
    let data=result.data
    console.log(data)
    let list = result.data.data.resultObjects;

    list=list.map(item=>{
      const newItem={};
      newItem.client_id=item.clientId;
      newItem.material_id=item.materialsId+' '+item.materialsName;
      newItem.repair_id=item.repairId+' '+item.repairName;
      newItem.material_repair_begindate=item.materialsRepairBegindate?item.materialsRepairBegindate.replace(/T/," "):item.materialsRepairBegindate;
      newItem.material_repair_enddate=item.materialsRepairEnddate?item.materialsRepairEnddate.replace(/T/," "):item.materialsRepairEnddate;
      newItem.material_repair_meno = item.materialsRepairMeno;
      newItem.client_creator=item.materialsRepairCreator;
      newItem.client_createtime=item.materialsRepairCreatetime;
      newItem.client_updator=item.materialsRepairUpdator;
      newItem.client_updatetime=item.materialsRepairUpdatetime;
      return newItem
    })
      context.commit("setList", list);
  },
  // 新增
  async addListAction({ dispatch }) {
    let formAdd={
      "isMaterialsView": true,
      "associatedIds":[
        state.formadd.material_id.split(' ')[0],
      ],
      "objectIds": [
        state.formadd.repair_id.split(' ')[0],
      ],
      // "materialsId":state.formadd.material_id.split(' ')[0],
      // "repairId":state.formadd.repair_id.split(' ')[0],
      "materialsRepairBegindate":state.formadd.material_repair_begindate,
      "materialsRepairEnddate":state.formadd.material_repair_enddate,
      "materialsRepairMeno": state.formadd.material_repair_meno,
    }
    let result = await request.post(api.MATERIALSREPAIR_ADD_API,formAdd);
    console.log('result',result)
    let data = result.data;
    if(data.statusCode==10000){
      Message({
        type: 'success',
        showClose: true, duration: 2000, message: '新增成功!'
      })
    }else if(data.statusCode==40001){
      Message({
        type: 'success',
        showClose: true, duration: 2000, message: '业务逻辑异常!'
      })
    }else if(data.statusCode==30006){
      Message({
        type: 'success',
        showClose: true, duration: 2000, message: '登录超时!'
      })
    }else{
      Message({
        type: 'success',
        showClose: true, duration: 2000, message: '操作失败!'
      })
    }
      console.log('add',data);
      await dispatch('getListAction')
  },
  // 修改
  async editListAction({ dispatch }) {
    let formEdit={
      "materialsId":state.formadd.material_id.split(' ')[0],
      // "materialsName":state.formadd.material_id.split(' ')[1],
      "repairId":state.formadd.repair_id.split(' ')[0],
      // "repairName":state.formadd.repair_id.split(' ')[1],
      "materialsRepairBegindate":state.formadd.material_repair_begindate,
      "materialsRepairEnddate":state.formadd.material_repair_enddate,
      "materialsRepairMeno": state.formadd.material_repair_meno,
    }
    let result = await request.put(api.MATERIALSREPAIR_ADIT_API,formEdit);
    let data = result.data;
    console.log('edit',data);
    if(data.statusCode==10000){
      Message({
        type: 'success',
        showClose: true, duration: 2000, message: '修改成功!'
      })
    }else if(data.statusCode==40001){
      Message({
        type: 'success',
        showClose: true, duration: 2000, message: '业务逻辑异常!'
      })
    }else if(data.statusCode==30006){
      Message({
        type: 'success',
        showClose: true, duration: 2000, message: '登录超时!'
      })
    }else{
      Message({
        type: 'success',
        showClose: true, duration: 2000, message: '操作失败!'
      })
    }

    await dispatch('getListAction')

  },
  // 删除
  async deleteSingleAction({ dispatch },params) {
    console.log(params)
    let formDelete={
      "materialsId":params.material_id.split(' ')[0],
      "repairId":params.repair_id.split(' ')[0]
    }
    console.log(formDelete);

    let result = await request.oDelete(api.MATERIALSREPAIR_DELETE_SINGLE_API,formDelete);
    let data = result.data;
    if(data.statusCode==10000){
      Message({
        type: 'success',
        showClose: true, duration: 2000, message: '删除成功!'
      })
    }else if(data.statusCode==40001){
      Message({
        type: 'success',
        showClose: true, duration: 2000, message: '业务逻辑异常!'
      })
    }else if(data.statusCode==30006){
      Message({
        type: 'success',
        showClose: true, duration: 2000, message: '登录超时!'
      })
    }else{
      Message({
        type: 'success',
        showClose: true, duration: 2000, message: '操作失败!'
      })
    }
      console.log(data);
      await dispatch('getListAction')
  },
   // 删除多
   async deleteListAction({ dispatch },param) {
    console.log(param)
    let formDelete={
      "primaryKeys":param,
    }
    console.log(formDelete);
    let result = await request.oDelete(api.MATERIALSREPAIR_DELETE_API,formDelete);
    let data = result.data;
    if(data.statusCode==10000){
      Message({
        type: 'success',
        showClose: true, duration: 2000, message: '删除成功!'
      })
    }else if(data.statusCode==40001){
      Message({
        type: 'success',
        showClose: true, duration: 2000, message: '业务逻辑异常!'
      })
    }else if(data.statusCode==30006){
      Message({
        type: 'success',
        showClose: true, duration: 2000, message: '登录超时!'
      })
    }else{
      Message({
        type: 'success',
        showClose: true, duration: 2000, message: '操作失败!'
      })
    }
      console.log(data);
      await dispatch('getListAction')
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};

import { api, request } from "../../ajax";
import { Message } from 'element-ui';

const state = {
  tableData: {
    list: [
      // {
      //   client_id: "a555",
      //   repair_id: "e12315",
      //   repair_name: "xxxxx",
      //   parent_id:'',
      //   repair_desc: "xxxxxxx",
      //   form_content: "",
      //   form_fileList: [],
      //   client_creator: "jj-56",
      //   client_createtime: "2016/05/03/14:06:55",
      //   client_updator: "jj-57",
      //   client_updatetime: "2016/05/03/14:16:55"
      // },
      // {
      //   client_id: "a5556",
      //   repair_id: "e123156",
      //   repair_name: "xxxxx6",
      //   parent_id:'e12315',
      //   repair_desc: "xxxxxxx6",
      //   form_content: "",
      //   form_fileList: [],
      //   client_creator: "jj-566",
      //   client_createtime: "2016/05/03/14:06:35",
      //   client_updator: "jj-567",
      //   client_updatetime: "2016/05/03/14:16:35"
      // }
    ],
    columns: [
      // { id: 1, prop: "client_id", label: "公司编号" },
      { id: 2, prop: "repair_id", label: "返修编号" },
      { id: 6, prop: "repair_name", label: "返修名称" },
      { id: 12, prop: "parent_id", label: "父级编号" },
      { id: 7, prop: "repair_desc", label: "修理说明标题" },
      { id: 21, prop: "repair_meno", label: "备注" },
      { id: 14, prop: "client_creator", label: "创建人" },
      { id: 15, prop: "client_createtime", label: "创建时间" },
      { id: 16, prop: "client_updator", label: "修改人" },
      { id: 17, prop: "client_updatetime", label: "修改时间" }
    ],
    formData: {
      client_id: "",
      repair_id: "",
      repair_name: "",
      parent_id:'',
      repair_desc: "",
      form_content: "",
      form_fileList: [],
      repair_meno:'',
      client_creator: "",
      client_createtime: "",
      client_updator: "",
      client_updatetime: ""
    }, //弹窗,
  },
  changeIndex: "",
  formadd: "",
  nowTime: ""
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
    let result = await request.post(api.REPAIR_SELECT_API);
    let data=result.data
    console.log(data)
    let list = result.data.data.resultObjects;

    list=list.map(item=>{
      const newItem={};
      newItem.client_id=item.clientId;
      newItem.repair_id=item.repairId;
      newItem.repair_name=item.repairName;
      newItem.parent_id=item.repairParentid;
      newItem.repair_desc=item.repairDesc;
      // newItem.form_fileList=item.repairMeno;
      newItem.repair_meno = item.repairMeno;
      newItem.client_creator=item.repairCreator;
      newItem.client_createtime=item.repairCreatetime;
      newItem.client_updator=item.repairUpdator;
      newItem.client_updatetime=item.repairUpdatetime;
      return newItem
    })
      context.commit("setList", list);
  },
  // 新增
  async addListAction({ dispatch }) {
    let formAdd={
      "repairId":state.formadd.repair_id,
      "repairName":state.formadd.repair_name,
      "repairParentid":state.formadd.parent_id,
      "repairDesc":state.formadd.repair_desc,
      // "repairMeno":state.formadd.form_fileList,
      "repairMeno": state.formadd.repair_meno,
    }
    let result = await request.post(api.REPAIR_ADD_API,formAdd);
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
      "repairId":state.formadd.repair_id,
      "repairName":state.formadd.repair_name,
      "repairParentid":state.formadd.parent_id,
      "repairDesc":state.formadd.repair_desc,
      // "repairMeno":state.formadd.form_fileList,
      "repairMeno": state.formadd.repair_meno,
    }
    let result = await request.put(api.REPAIR_ADIT_API,formEdit);
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
  async deleteSingleAction({ dispatch },param) {

    let formDelete={
      "repairId":param
    }
    console.log(formDelete);

    let result = await request.oDelete(api.REPAIR_DELETE_SINGLE_API,formDelete);
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
      "repairIds":param
    }
    console.log(formDelete);
    let result = await request.oDelete(api.REPAIR_DELETE_API,formDelete);
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

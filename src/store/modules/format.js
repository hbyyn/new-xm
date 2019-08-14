// import Date from "../time";
import { api, request } from "../../ajax";
import { Message } from 'element-ui';

const state = {
  tableData: {
    list: [
      // {
      //   client_id: "66",
      //   format_id: "66",
      //   //规划
      //   format_name: "BBBB",

      //   client_creator: "66",
      //   client_createtime: "66",
      //   client_updator: "66",
      //   client_updatetime: "66"
      // }
    ],
    columns: [
      // { id: 1, prop: 'client_id', label: "公司编号" },
      { id: 2, prop: "format_id", label: "规格编号" },
      { id: 3, prop: "format_name", label: "规格名称" },
      { id: 14, prop: "client_creator", label: "创建人" },
      { id: 15, prop: "client_createtime", label: "创建时间" },
      { id: 16, prop: "client_updator", label: "修改人" },
      { id: 17, prop: "client_updatetime", label: "修改时间" }
    ],
    formData: {
      client_id: "",
      format_id: "",
      format_name: "",
      client_creator: "",
      client_createtime: "",
      client_updator: "",
      client_updatetime: ""
    },
    formInit: {
      client_id: "",
      format_id: "",
      format_name: "",
      client_creator: "",
      client_createtime: "",
      client_updator: "",
      client_updatetime: ""
    }
  },
  changeIndex: "",
  formadd: "",
  nowTime: ""
};
const mutations = {
  // setNowTime(state) {
  //   state.nowTime = new Date().Format("yyyy-MM-dd hh:mm:ss");
  // },
  setformadd(state, param) {
    state.formadd = param;
    state.tableData.formData = { ...state.tableData.formInit };
  },
  setChangeIndex(state, param) {
    state.changeIndex = param;
  },
  // //增
  // rowAddStore(state) {
  //   state.formadd.client_id = sessionStorage.getItem("client_id");
  //   state.formadd.client_creator = sessionStorage.getItem("user_name");
  //   state.formadd.client_createtime = state.nowTime;
  //   state.tableData.list.unshift(state.formadd);
  // },
  // rowRemoveStore(state, param) {
  //   state.tableData.list = state.tableData.list.filter(
  //     item => param.indexOf(item) < 0
  //   );
  // },
  // //改
  // pwdChange(state) {
  //   state.formadd.client_updator = sessionStorage.getItem("user_name");
  //   state.formadd.client_updatetime = state.nowTime;
  //   state.tableData.list.splice(state.changeIndex, 1, state.formadd);
  // },
  setList(state, param) {
    state.tableData.list = param;
    console.log(state.tableData.list)
  }
};

const actions = {
  // 获取list数据
  async getListAction(context) {
    let result = await request.post(api.FORMAT_SELECT_API);
    let data=result.data
    console.log(data)
    let list = result.data.data.resultObjects;

    list=list.map(item=>{
      const newItem={};
      newItem.client_id=item.clientId;
      newItem.format_id=item.formatId;
      newItem.format_name=item.formatName;
      newItem.client_creator=item.formatCreator;
      newItem.client_createtime=item.formatCreatetime;
      newItem.client_updator=item.formatUpdator;
      newItem.client_updatetime=item.formatUpdatetime;
      return newItem
    })
      context.commit("setList", list);
  },
  // 新增
  async addListAction({ dispatch }) {
    let formAdd={
      "formatName":state.formadd.format_name,
      "formatId":state.formadd.format_id
    }
    let result = await request.post(api.FORMAT_ADD_API,formAdd);
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
      "formatName":state.formadd.format_name,
      "formatId":state.formadd.format_id
    }
    let result = await request.put(api.FORMAT_ADIT_API,formEdit);
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
      "formatId":param
    }
    console.log(formDelete);

    let result = await request.oDelete(api.FORMAT_DELETE_SINGLE_API,formDelete);
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
      "formatIds":param
    }
    console.log(formDelete);
    let result = await request.oDelete(api.FORMAT_DELETE_API,formDelete);
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

import { api, request } from "../../ajax";
import { Message } from 'element-ui';

const state = {
  tableData:{
    list: [
    //   {
    //   client_id: 'a555',
    //   work_id: 'c222',
    //   work_name: '加工',
    //   parent_id:'',
    //   work_desc: '打豆豆',
    //   client_creator: 'jj-56',
    //   client_createtime: '2016/05/03/14:06:55',
    //   client_updator: 'jj-57',
    //   client_updatetime: '2016/05/03/14:16:55'
    // }
  ],
    columns: [
      // {id:1,prop:'client_id',label:"公司编号"},
      {id:7,prop:'work_id',label:"工序编号"},
      {id:2,prop:'work_name',label:"工序名称"},
      { id: 12, prop: "parent_id", label: "父级编号" },
      {id:8,prop:'work_desc',label:"工作描述"},
      { id: 14, prop: 'client_creator', label: "创建人" },
      { id: 15, prop: 'client_createtime', label: "创建时间" },
      { id: 16, prop: 'client_updator', label: "修改人" },
      { id: 17, prop: 'client_updatetime', label: "修改时间" }
      ],
    formData: {
      client_id: '',
      work_id: '',
      work_name: '',
      parent_id:'',
      work_desc: '',
      client_creator: '',
      client_createtime: '',
      client_updator: '',
      client_updatetime: ''
    }, //弹窗,
  },
  changeIndex: "",
  formadd: "",
  parentOption:[]
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
  },
  setParentOption(state, param) {
    state.parentOption= param;
    console.log(state.parentOption)
  },

};



const actions = {
  async getParentOptionAction(context) {
    let result = await request.post(api.WORK_BASETREE_API);
    let data=result.data.data
    console.log(data)
    let newarr = []
    function render (arr, newarr) {
        for (let i=0;i < arr.length; i++) {
          newarr.push({value:arr[i].workId,label:arr[i].workId+''+arr[i].workName,children:[]})
          if (arr[i].childNodes && arr[i].childNodes.length > 0) {
            render(arr[i].childNodes, newarr[i].children)
          }else if(newarr[i].children.length == 0){
            newarr[i].children=''
          }
        }
        return newarr
      }
      render(data,newarr)
      console.log(newarr)
    context.commit("setParentOption", newarr);

  },
  // 获取list数据
  async getListAction(context) {
    let result = await request.post(api.WORK_SELECT_API);
    let data=result.data
    console.log(data)
    let list = result.data.data.resultObjects;

    list=list.map(item=>{
      const newItem={};
      newItem.client_id=item.clientId;
      newItem.work_id=item.workId;
      newItem.work_name=item.workName;
      newItem.parent_id=item.workParentid;
      newItem.work_desc=item.workDesc;
      newItem.client_creator=item.workCreator;
      newItem.client_createtime=item.workCreatetime;
      newItem.client_updator=item.workUpdator;
      newItem.client_updatetime=item.workUpdatetime;
      return newItem
    })
      context.commit("setList", list);
  },
  // 新增
  async addListAction({ dispatch }) {
    let formAdd={
      "workId":state.formadd.work_id,
      "workName":state.formadd.work_name,
      "workParentid":state.formadd.parent_id.pop(),
      "workDesc":state.formadd.work_desc,
    }
    let result = await request.post(api.WORK_ADD_API,formAdd);
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
      "workId":state.formadd.work_id,
      "workName":state.formadd.work_name,
      "workParentid":state.formadd.parent_id,
      "workDesc":state.formadd.work_desc,
    }
    let result = await request.put(api.WORK_ADIT_API,formEdit);
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
      "workId":param
    }
    console.log(formDelete);

    let result = await request.oDelete(api.WORK_DELETE_SINGLE_API,formDelete);
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
      "workIds":param
    }
    console.log(formDelete);
    let result = await request.oDelete(api.WORK_DELETE_API,formDelete);
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



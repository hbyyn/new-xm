import { api, request } from "../../ajax";
import { Message } from 'element-ui';

const state = {
  tableData:{
    list: [
    //   {
    //   client_id: "88",
    //   //产品表
    //   product_id: "88",
    //   product_name: "SSSS",
    //   product_color:"#536985",
    //   product_desc: "88",

    //   client_creator: "88",
    //   client_createtime: "88",
    //   client_updator: "88",
    //   client_updatetime: "88"
    // },{
    //   client_id: "881",
    //   //产品表
    //   product_id: "881",
    //   product_name: "SSSS1",
    //   product_color:"#5369851",
    //   product_desc: "881",

    //   client_creator: "881",
    //   client_createtime: "881",
    //   client_updator: "881",
    //   client_updatetime: "881"
    // }
  ],
    columns: [
      // { id: 1, prop: 'client_id', label: "公司编号" },
      { id: 2, prop: 'product_id', label: "产品编号" },
      { id: 3, prop: 'product_name', label: "产品名称" },
      { id: 4, prop: 'product_color', label: "产品颜色" },
      { id: 5, prop: 'product_desc', label: "产品描述" },
      { id: 14, prop: 'client_creator', label: "创建人" },
      { id: 15, prop: 'client_createtime', label: "创建时间" },
      { id: 16, prop: 'client_updator', label: "修改人" },
      { id: 17, prop: 'client_updatetime', label: "修改时间" }
    ],
    formData: {
      client_id: "",
      //产品表
      product_id: "",
      product_name: "",
      product_color:"",
      product_desc: "",

      client_creator: "",
      client_createtime: "",
      client_updator: "",
      client_updatetime: ""
    }, //弹窗,
  },
  changeIndex: "",
  formadd: "",
  nowTime:"",
};
const mutations = {
  // setNowTime(state) {
  //   state.nowTime =(new Date()).Format("yyyy-MM-dd hh:mm:ss")
  // },
  setformadd(state, param) {
    state.formadd = param;
  },
  setChangeIndex(state, param) {
    state.changeIndex = param;
  },
  // //增
  // rowAddStore(state) {
  //   state.formadd.client_id = sessionStorage.getItem("client_id");
  //   state.formadd.client_creator = sessionStorage.getItem("user_name");
  //   state.formadd.client_createtime = state.nowTime
  //   state.tableData.list.unshift(state.formadd);
  // },
  // rowRemoveStore(state,param){
  //   state.tableData.list=state.tableData.list.filter( item=>(param.indexOf(item) < 0))
  // },
  // //改
  // pwdChange(state) {
  //   state.formadd.client_updator = sessionStorage.getItem("user_name");
  //   state.formadd.client_updatetime = state.nowTime
  //   state.tableData.list.splice(state.changeIndex, 1, state.formadd);
  // },
  setList(state, param) {
    state.tableData.list = param;
    console.log(state.tableData.list)
  }
}

const actions = {
  // 获取list数据
  async getListAction(context) {
    let result = await request.post(api.PRODUCT_SELECT_API);
    let data=result.data
    console.log(data)
    let list = result.data.data.resultObjects;

    list=list.map(item=>{
      const newItem={};
      newItem.client_id=item.clientId;
      newItem.product_id=item.productId;
      newItem.product_name=item.productName;
      newItem.product_color=item.productColor;
      newItem.product_desc=item.productDesc;
      newItem.client_creator=item.productCreator;
      newItem.client_createtime=item.productCreatetime;
      newItem.client_updator=item.productUpdator;
      newItem.client_updatetime=item.productUpdatetime;
      return newItem
    })
      context.commit("setList", list);
  },
  // 新增
  async addListAction({ dispatch }) {
    let formAdd={
      "productName":state.formadd.product_name,
      "productId":state.formadd.product_id,
      "productColor":state.formadd.product_color,
      "productDesc":state.formadd.product_desc
    }
    let result = await request.post(api.PRODUCT_ADD_API,formAdd);
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
      "productName":state.formadd.product_name,
      "productId":state.formadd.product_id,
      "productColor":state.formadd.product_color,
      "productDesc":state.formadd.product_desc
    }
    let result = await request.put(api.PRODUCT_ADIT_API,formEdit);
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
      "productId":param
    }
    console.log(formDelete);

    let result = await request.oDelete(api.PRODUCT_DELETE_SINGLE_API,formDelete);
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
      "productIds":param
    }
    console.log(formDelete);
    let result = await request.oDelete(api.PRODUCT_DELETE_API,formDelete);
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

import { api, request } from "../../ajax";
import { Message } from 'element-ui';

const state = {
  tableData:{
    list: [
    //   {
    //   client_id: 'a555',
    //   order_id: '6564564',
    //   product_id: 'b546',
    //   order_product_date: '2016/05/03',
    //   client_creator: 'jj-56',
    //   client_createtime: '2016/05/03/14:06:55',
    //   client_updator: 'jj-57',
    //   client_updatetime: '2016/05/03/14:16:55'
    // }
  ],
    columns:[
      // { id: 1, prop: 'client_id', label: "公司编号" },
      { id: 3, prop: 'order_id', label: "订单编号" },
      { id: 2, prop: 'product_id', label: "产品编号" },
      { id: 4, prop: 'order_product_date', label: "订单时间" },
      { id: 14, prop: 'client_creator', label: "创建人" },
      { id: 15, prop: 'client_createtime', label: "创建时间" },
      { id: 16, prop: 'client_updator', label: "修改人" },
      { id: 17, prop: 'client_updatetime', label: "修改时间" }
    ],
    formData: {
      client_id: '',
      order_id: '6564564+',
      product_id: 'b54+6',
      order_product_date: '',
      client_creator: '',
      client_createtime: '',
      client_updator: '',
      client_updatetime: ''
    }, //弹窗,
  },
  changeIndex: "",
  formadd: ""
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
    let result = await request.post(api.ORDERPRODUCT_SELECT_API);
    let data=result.data
    console.log(data)
    let list = result.data.data.resultObjects;

    list=list.map(item=>{
      const newItem={};
      newItem.client_id=item.clientId;
      newItem.order_id=item.orderId;
      newItem.product_id=item.productId;
      newItem.order_product_date=item.orderProductDate ? item.orderProductDate.replace(/T/," ") : item.orderProductDate;
      newItem.client_creator=item.orderProductCreator;
      newItem.client_createtime=item.orderProductCreatetime;
      newItem.client_updator=item.orderProductUpdator;
      newItem.client_updatetime=item.orderProductUpdatetime;
      return newItem
    })
      context.commit("setList", list);
  },
  // 新增
  async addListAction({ dispatch }) {
    let formAdd={
      "orderId":state.formadd.order_id.split(' ')[0],
      "productId":state.formadd.product_id.split(' ')[0],
      "orderProductDate":state.formadd.order_product_date,
    }
    let result = await request.post(api.ORDERPRODUCT_ADD_API,formAdd);
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
      "orderId":state.formadd.order_id.split(' ')[0],
      "productId":state.formadd.product_id.split(' ')[0],
      "orderProductDate":state.formadd.order_product_date,
    }
    let result = await request.put(api.ORDERPRODUCT_ADIT_API,formEdit);
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
      "orderId":param
    }
    console.log(formDelete);

    let result = await request.oDelete(api.ORDERPRODUCT_DELETE_SINGLE_API,formDelete);
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
      "orderIds":param
    }
    console.log(formDelete);
    let result = await request.oDelete(api.ORDERPRODUCT_DELETE_API,formDelete);
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
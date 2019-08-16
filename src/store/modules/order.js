import { api, request } from "../../ajax";
import { Message } from 'element-ui';

const state = {
  tableData:{
    list: [
    //   {
    //   client_id: 'a555',
    //   order_id: '6564564',
    //   customers_id: 'b546',
    //   order_date: '2016/05/03',
    //   order_outdate: '2016/06/03',
    //   client_creator: 'jj-56',
    //   client_createtime: '2016/05/03/14:06:55',
    //   client_updator: 'jj-57',
    //   client_updatetime: '2016/05/03/14:16:55'
    // }
  ],
    columns: [
      // { id: 1, prop: 'client_id', label: "公司编号" },
      { id: 2, prop: 'order_id', label: "订购编号" },
      { id: 3, prop: 'customers_id', label: "客户编号" },
      { id: 4, prop: 'order_date', label: "订购时间" },
      { id: 5, prop: 'order_outdate', label: "订单过时" },
      { id: 14, prop: 'client_creator', label: "创建人" },
      { id: 15, prop: 'client_createtime', label: "创建时间" },
      { id: 16, prop: 'client_updator', label: "修改人" },
      { id: 17, prop: 'client_updatetime', label: "修改时间" }
    ],
    formData: {
      client_id: '',
      order_id: '6564564+',
      customers_id: 'b546+',
      order_date: '',
      order_outdate: '',
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
  // setNowTime(state) {
  //   state.nowTime =(new Date()).order("yyyy-MM-dd hh:mm:ss")
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
};




const actions = {
  // 获取list数据
  async getListAction(context) {
    let result = await request.post(api.ORDER_SELECT_API);
    let data=result.data
    console.log(data)
    let list = result.data.data.resultObjects;

    list=list.map(item=>{
      const newItem={};
      newItem.client_id=item.clientId;
      newItem.order_id=item.orderId;
      newItem.customers_id=item.customersId+" "+item.customersName;
      newItem.order_date=item.orderDate?item.orderDate.replace(/T/," "):item.orderDate;
      newItem.order_outdate=item.orderOutdate?item.orderOutdate.replace(/T/," "):item.orderOutdate;
      newItem.client_creator=item.orderCreator;
      newItem.client_createtime=item.orderCreatetime;
      newItem.client_updator=item.orderUpdator;
      newItem.client_updatetime=item.orderUpdatetime;
      return newItem
    })
      context.commit("setList", list);
  },
  // 新增
  async addListAction({ dispatch }) {
    let formAdd={
      "orderId":state.formadd.order_id,
      "customersId":state.formadd.customers_id.split(' ')[0],
      "customersName":state.formadd.customers_id.split(' ')[1],
      "orderDate":state.formadd.order_date,
      "orderOutdate":state.formadd.order_outdate,
    }
    let result = await request.post(api.ORDER_ADD_API,formAdd);
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
      "orderId":state.formadd.order_id,
      "customersId":state.formadd.customers_id.split(' ')[0],
      "customersName":state.formadd.customers_id.split(' ')[1],
      "orderDate":state.formadd.order_date,
      "orderOutdate":state.formadd.order_outdate,
    }
    let result = await request.put(api.ORDER_ADIT_API,formEdit);
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
    let result = await request.oDelete(api.ORDER_DELETE_SINGLE_API,params);
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
    let result = await request.oDelete(api.ORDER_DELETE_API,formDelete);
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

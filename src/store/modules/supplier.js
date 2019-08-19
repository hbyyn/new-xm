import { api, request } from "../../ajax";
import { Message } from 'element-ui';


const state = {
  tableData:{
    list: [
    //   {
    //   client_id: "22",
    //   supplier_id:"333",
    //   //供应商
    //   supplier_name: "DDD",
    //   supplier_tel: "333",
    //   supplier_address: "333",
    //   supplier_fax: "333",
    //   client_creator: "333",
    //   client_createtime: "333",
    //   client_updator: "333",
    //   client_updatetime: "333"
    // }
  ],
    columns: [
      // { id: 1, prop: 'client_id', label: "公司编号" },
      { id: 2, prop: 'supplier_id', label: "供应商编号" },
      { id: 3, prop: 'supplier_name', label: "供应商名称" },
      { id: 4, prop: 'supplier_tel', label: "供应商电话" },
      { id: 5, prop: 'supplier_address', label: "供应商地址" },
      { id: 6, prop: 'supplier_fax', label: "供应商传真" },
      // supplierMeno
      { id: 21, prop: "supplier_meno", label: "备注" },
      { id: 14, prop: 'client_creator', label: "创建人" },
      { id: 15, prop: 'client_createtime', label: "创建时间" },
      { id: 16, prop: 'client_updator', label: "修改人" },
      { id: 17, prop: 'client_updatetime', label: "修改时间" }
    ],
    formData: {
      client_id: "",
      supplier_id:"333+",
      //供应商
      supplier_name: "DDD+",
      supplier_tel: "333+",
      supplier_address: "333+",
      supplier_fax: "333+",
      supplier_meno:'',
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
};

const actions = {
  // 获取list数据
  async getListAction(context) {
    let result = await request.post(api.SUPPLIER_SELECT_API);
    let data=result.data
    console.log(data)
    let list = result.data.data.resultObjects;

    list=list.map(item=>{
      const newItem={};
      newItem.client_id=item.clientId;
      newItem.supplier_id=item.supplierId;
      newItem.supplier_name=item.supplierName;
      newItem.supplier_tel=item.supplierTel;
      newItem.supplier_address=item.supplierAddress;
      newItem.supplier_fax=item.supplierFax;
      newItem.supplier_meno = item.supplierMeno;
      newItem.client_creator=item.supplierCreator;
      newItem.client_createtime=item.supplierCreatetime;
      newItem.client_updator=item.supplierUpdator;
      newItem.client_updatetime=item.supplierUpdatetime;
      return newItem
    })
      context.commit("setList", list);
  },
  // 新增
  async addListAction({ dispatch }) {
    let formAdd={
      "supplierId":state.formadd.supplier_id,
      "supplierName":state.formadd.supplier_name,
      "supplierTel":state.formadd.supplier_tel,
      "supplierAddress":state.formadd.supplier_address,
      "supplierFax":state.formadd.supplier_fax,
      "supplierMeno": state.formadd.supplier_meno,
    }
    let result = await request.post(api.SUPPLIER_ADD_API,formAdd);
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
      "supplierId":state.formadd.supplier_id,
      "supplierName":state.formadd.supplier_name,
      "supplierTel":state.formadd.supplier_tel,
      "supplierAddress":state.formadd.supplier_address,
      "supplierFax":state.formadd.supplier_fax,
      "supplierMeno": state.formadd.supplier_meno,
    }
    let result = await request.put(api.SUPPLIER_ADIT_API,formEdit);
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
      "supplierId":param
    }
    console.log(formDelete);

    let result = await request.oDelete(api.SUPPLIER_DELETE_SINGLE_API,formDelete);
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
      "supplierIds":param
    }
    console.log(formDelete);
    let result = await request.oDelete(api.SUPPLIER_DELETE_API,formDelete);
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

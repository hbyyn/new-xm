// import Date from "../time";
import { api, request } from "../../ajax";
import { Message } from 'element-ui';
const state = {
  tableData: {
    list: [
    //   {
    //   client_id: "xxx",
    //   material_id: "xxx",
    //   material_type: "xxx",
    //   material_name: "xxx",
    //   format_id: "xxx",
    //   material_unit: "xxx",
    //   supplier_id: "xxx",
    //   material_erpid: "xxx",
    //   material_indate: "xxx",
    //   material_storeid: "xxx",
    //   material_operaterid: "xxx",
    //   material_operaterdate: "xxx",
    //   parent_id: "",
    //   product_id: "88 SSSS",

    //   client_creator: "xxx",
    //   client_createtime: "xxx",
    //   client_updator: "",
    //   client_updatetime: ""
    // },
    // {
    //   client_id: "xxx2",
    //   material_id: "xxx2",
    //   material_type: "xxx2",
    //   material_name: "zz2",
    //   format_id: "xxx2",
    //   material_unit: "xxx2",
    //   supplier_id: "xxx2",
    //   material_erpid: "xxx2",
    //   material_indate: "xxx2",
    //   material_storeid: "xxx2",
    //   material_operaterid: "xxx2",
    //   material_operaterdate: "xxx2",
    //   parent_id: "",
    //   product_id: "88 SSSS",

    //   client_creator: "xxx2",
    //   client_createtime: "xxx2",
    //   client_updator: "",
    //   client_updatetime: ""
    // }
  ],
    columns: [
      // { id: 1, prop: "client_id", label: "公司编号" },
      { id: 2, prop: "material_id", label: "物料编号" },
      { id: 4, prop: "material_name", label: "物料名称" },
      { id: 3, prop: "material_type", label: "物料类型" },
      { id: 13, prop: "format_id", label: "规格编号" },
      { id: 5, prop: "material_unit", label: "物料单位" },
      { id: 6, prop: "supplier_id", label: "供应商编号" },
      { id: 7, prop: "material_erpid", label: "ERP编号" },
      { id: 8, prop: "material_indate", label: "EPR入库日期" },
      { id: 9, prop: "material_storeid", label: "EPR入库编号" },
      { id: 10, prop: "material_operaterid", label: "领料人" },
      { id: 11, prop: "material_operaterdate", label: "领料时间" },
      { id: 12, prop: "parent_id", label: "父级编号" },
      { id: 18, prop: "product_id", label: "产品编号" },
      { id: 21, prop: "material_meno", label: "备注" },
      { id: 14, prop: "client_creator", label: "创建人" },
      { id: 15, prop: "client_createtime", label: "创建时间" },
      { id: 16, prop: "client_updator", label: "修改人" },
      { id: 17, prop: "client_updatetime", label: "修改时间" }
    ],
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
  //   // if(state.formadd.product_id){

  //   // }
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
  // }
  setList(state, param) {
    state.tableData.list = param;
    console.log(state.tableData.list)
  }
};


const actions = {
  // 获取list数据
  async getListAction(context) {
    let result = await request.post(api.MATERIALS_SELECT_API);
    let data=result.data
    console.log('listShow',data)

    let list = result.data.data.resultObjects;

    list=list.map(item=>{
      const newItem={};
      newItem.client_id=item.clientId;
      newItem.material_id=item.materialsId;
      newItem.material_name=item.materialsName;
      newItem.material_type=item.materialsType;
      newItem.format_id=item.formatId+' '+item.formatName;
      newItem.material_unit=item.materialsUnit;
      newItem.supplier_id=item.supplierId+' '+item.supplierName;
      newItem.material_erpid=item.materialsErpid;
      newItem.material_indate=item.materialsIndate;
      newItem.material_storeid=item.materialsStoreid;
      newItem.material_operaterid=item.materialsOperaterid;
      newItem.material_operaterdate=item.materialsOperaterdate;
      newItem.parent_id=item.parentId;
      newItem.product_id=item.productId+' '+item.productName;
      newItem.material_meno = item.materialsMeno;
      newItem.client_creator=item.materialsCreator;
      newItem.client_createtime=item.materialsCreatetime;
      newItem.client_updator=item.materialsUpdator;
      newItem.client_updatetime=item.materialsUpdatetime;
      return newItem
    })
      context.commit("setList", list);
  },
  // 新增
  async addListAction({ dispatch }) {
    let formAdd={
      "materialsId":state.formadd.material_id,
      "materialsName":state.formadd.material_name,
      "materialsType":state.formadd.material_type,
      "formatId":state.formadd.format_id.split(' ')[0],
      "formatName":state.formadd.format_id.split(' ')[1],
      "materialsUnit":state.formadd.material_unit,
      "supplierId":state.formadd.supplier_id.split(' ')[0],
      "supplierName":state.formadd.supplier_id.split(' ')[1],
      "materialsErpid":state.formadd.material_erpid,
      "materialsIndate":state.formadd.material_indate,
      "materialsStoreid":state.formadd.material_storeid,
      "materialsOperaterid":state.formadd.material_operaterid,
      "materialsOperaterdate":state.formadd.material_operaterdate,
      "parentId":state.formadd.parent_id,
      "productId":state.formadd.product_id.split(' ')[0],
      "productName":state.formadd.product_id.split(' ')[1],
      "materialsMeno": state.formadd.material_meno,
    }
    let result = await request.post(api.MATERIALS_ADD_API,formAdd);
    let data = result.data;
    if(data.statusCode==10000){
      Message({
        type: 'success',
        showClose: true, duration: 2000, message: '新增成功!'
      })
    }else if(data.statusCode==30006){
      Message({
        type: 'success',
        showClose: true, duration: 2000, message: '登录超时!'
      })
    }else if(data.statusCode==40001){
      Message({
        type: 'success',
        showClose: true, duration: 2000, message: '业务逻辑异常!查看是否已存在编号'
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
      "materialsId":state.formadd.material_id,
      "materialsName":state.formadd.material_name,
      "materialsType":state.formadd.material_type,
      "formatId":state.formadd.format_id.split(' ')[0],
      "formatName":state.formadd.format_id.split(' ')[1],
      "materialsUnit":state.formadd.material_unit,
      "supplierId":state.formadd.supplier_id.split(' ')[0],
      "supplierName":state.formadd.supplier_id.split(' ')[1],
      "materialsErpid":state.formadd.material_erpid,
      "materialsIndate":state.formadd.material_indate,
      "materialsStoreid":state.formadd.material_storeid,
      "materialsOperaterid":state.formadd.material_operaterid,
      "materialsOperaterdate":state.formadd.material_operaterdate,
      "parentId":state.formadd.parent_id,
      "productId":state.formadd.product_id.split(' ')[0],
      "productName":state.formadd.product_id.split(' ')[1],
      "materialsMeno": state.formadd.material_meno,
    }
    let result = await request.put(api.MATERIALS_ADIT_API,formEdit);
    let data = result.data;
    console.log('edit',data);
    if(data.statusCode==10000){
      Message({
        type: 'success',
        showClose: true, duration: 2000, message: '修改成功!'
      })
    }else if(data.statusCode==30006){
      Message({
        type: 'success',
        showClose: true, duration: 2000, message: '登录超时!'
      })
    }else if(data.statusCode==40001){
      Message({
        type: 'success',
        showClose: true, duration: 2000, message: '业务逻辑异常!'
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
      "materialsId":param
    }
    console.log(formDelete);

    let result = await request.oDelete(api.MATERIALS_DELETE_SINGLE_API,formDelete);
    let data = result.data;
    if(data.statusCode==10000){
      Message({
        type: 'success',
        showClose: true, duration: 2000, message: '删除成功!'
      })
    }else if(data.statusCode==30006){
      Message({
        type: 'success',
        showClose: true, duration: 2000, message: '登录超时!'
      })
    }else if(data.statusCode==40001){
      Message({
        type: 'success',
        showClose: true, duration: 2000, message: '业务逻辑异常，查看是否其它地方有引用此数据!'
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
      "materialsIds":param
    }
    console.log(formDelete);
    let result = await request.oDelete(api.MATERIALS_DELETE_API,formDelete);
    let data = result.data;
    if(data.statusCode==10000){
      Message({
        type: 'success',
        showClose: true, duration: 2000, message: '删除成功!'
      })
    }else if(data.statusCode==30006){
      Message({
        type: 'success',
        showClose: true, duration: 2000, message: '登录超时!'
      })
    }else if(data.statusCode==4001){
      Message({
        type: 'success',
        showClose: true, duration: 2000, message: '业务逻辑异常，查看是否其它地方有引用此数据!'
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
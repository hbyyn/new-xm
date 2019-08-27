import { api, request } from "../../ajax";
import { Message } from "element-ui";
import router from "../../router";

const state = {
  tableData: {
    list: [
      // {
      //   client_id: "w737474",
      //   customers_id: "o277178",
      //   customers_name: "朱丽",
      //   customers_tel: "13723460272",
      //   customers_address: "贵州省 贵阳市 观山湖区",
      //   customers_fax: "0634692",
      //   client_creator: "jj-56",
      //   client_createtime: "2016/05/03/14:06:55",
      //   client_updator: "jj-57",
      //   client_updatetime: "2016/05/03/14:16:55"
      // }
    ],
    columns: [
      // { id: 1, prop: "client_id", label: "公司编号" },
      { id: 2, prop: "customers_id", label: "客户编号" },
      { id: 3, prop: "customers_name", label: "客户姓名" },
      { id: 4, prop: "customers_tel", label: "客户电话" },
      { id: 5, prop: "customers_address", label: "客户地址" },
      { id: 6, prop: "customers_fax", label: "客户传真" },
      { id: 21, prop: "customers_meno", label: "备注" },
      { id: 14, prop: "client_creator", label: "创建人" },
      { id: 15, prop: "client_createtime", label: "创建时间" },
      { id: 16, prop: "client_updator", label: "修改人" },
      { id: 17, prop: "client_updatetime", label: "修改时间" }
    ],
    formData: {
      client_id: "",
      customers_id: "",
      customers_name: "",
      customers_tel: "",
      customers_address: "",
      customers_fax: "",
      customers_meno: "",
      client_creator: "",
      client_createtime: "",
      client_updator: "",
      client_updatetime: ""
    }
  },
  changeIndex: "",
  formadd: "",
  nowTime: "",
  count: 0,
  searchList: []
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
    console.log(state.tableData.list);
  },
  setCount(state, param) {
    state.count = param;
  },
  setSearchList(state, param) {
    state.searchList = param;
    console.log(state.searchList);
  }
};

const actions = {
  // 获取list数据
  async getListAction(context, param={}) {
    let { pageIndex = 1, pageSize = 10, customersId='' } = param;
    const page = {
      pageIndex,
      pageSize,
      customersId
    };
    let result = await request.post(api.CUSTOMERS_SELECT_API, page);
    let count = result.data.data.count;
    context.commit("setCount", count);
    let list = result.data.data.resultObjects;

    list = list.map(item => {
      const newItem = {};
      newItem.client_id = item.clientId;
      newItem.customers_id = item.customersId;
      newItem.customers_name = item.customersName;
      newItem.customers_tel = item.customersTel;
      newItem.customers_address = item.customersAddress;
      newItem.customers_fax = item.customersFax;
      newItem.customers_meno = item.customersMeno;
      newItem.client_creator = item.customersCreator;
      newItem.client_createtime = item.customersCreatetime;
      newItem.client_updator = item.customersUpdator;
      newItem.client_updatetime = item.customersUpdatetime;
      return newItem;
    });
    context.commit("setList", list);
  },
  // 查询
  async checkListAction(context) {
    let result = await request.post(api.CUSTOMERS_SELECT_BASE_API);
    let searchList = result.data.data.resultObjects;
    searchList = searchList.map(item => {
      const newItem = {};
      newItem.customers_id = item.customersId;
      newItem.customers_name = item.customersName;
      return newItem;
    });
    context.commit("setSearchList", searchList);
  },
  // 新增
  async addListAction({ dispatch }) {
    let formAdd = {
      customersId: state.formadd.customers_id,
      customersName: state.formadd.customers_name,
      customersTel: state.formadd.customers_tel,
      customersAddress: state.formadd.customers_address,
      customersFax: state.formadd.customers_fax,
      customersMeno: state.formadd.customers_meno
    };
    let result = await request.post(api.CUSTOMERS_ADD_API, formAdd);
    let data = result.data;
    if (data.statusCode == 10000) {
      Message({
        type: "success",
        showClose: true,
        duration: 2000,
        message: "新增成功!"
      });
    } else if (data.statusCode == 40001) {
      Message({
        type: "warning",
        showClose: true,
        duration: 2000,
        message: "业务逻辑异常!"
      });
    } else if (data.statusCode == 30001) {
      router.push({ path: "/login" });
      Message({
        type: "warning",
        showClose: true,
        duration: 2000,
        message: "用户未登录!"
      });
    } else if (data.statusCode == 30006) {
      router.push({ path: "/login" });
      Message({
        type: "warning",
        showClose: true,
        duration: 2000,
        message: "登录超时!"
      });
    } else {
      Message({
        type: "warning",
        showClose: true,
        duration: 2000,
        message: "操作失败!"
      });
    }
    console.log("add", data);
    await dispatch("getListAction");
  },
  // 修改
  async editListAction({ dispatch }) {
    let formEdit = {
      customersId: state.formadd.customers_id,
      customersName: state.formadd.customers_name,
      customersTel: state.formadd.customers_tel,
      customersAddress: state.formadd.customers_address,
      customersFax: state.formadd.customers_fax,
      customersMeno: state.formadd.customers_meno
    };
    let result = await request.put(api.CUSTOMERS_ADIT_API, formEdit);
    let data = result.data;
    console.log("edit", data);
    if (data.statusCode == 10000) {
      Message({
        type: "success",
        showClose: true,
        duration: 2000,
        message: "修改成功!"
      });
    } else if (data.statusCode == 40001) {
      Message({
        type: "warning",
        showClose: true,
        duration: 2000,
        message: "业务逻辑异常!"
      });
    } else if (data.statusCode == 30001) {
      router.push({ path: "/login" });
      Message({
        type: "warning",
        showClose: true,
        duration: 2000,
        message: "用户未登录!"
      });
    } else if (data.statusCode == 30006) {
      router.push({ path: "/login" });
      Message({
        type: "warning",
        showClose: true,
        duration: 2000,
        message: "登录超时!"
      });
    } else {
      Message({
        type: "warning",
        showClose: true,
        duration: 2000,
        message: "操作失败!"
      });
    }

    await dispatch("getListAction");
  },
  // 删除
  async deleteSingleAction({ dispatch }, param) {
    let formDelete = {
      customersId: param
    };
    console.log(formDelete);

    let result = await request.oDelete(
      api.CUSTOMERS_DELETE_SINGLE_API,
      formDelete
    );
    let data = result.data;
    if (data.statusCode == 10000) {
      Message({
        type: "success",
        showClose: true,
        duration: 2000,
        message: "删除成功!"
      });
    } else if (data.statusCode == 40001) {
      Message({
        type: "warning",
        showClose: true,
        duration: 2000,
        message: "业务逻辑异常，查看是否其它地方有引用此数据!"
      });
    } else if (data.statusCode == 30001) {
      router.push({ path: "/login" });
      Message({
        type: "warning",
        showClose: true,
        duration: 2000,
        message: "用户未登录!"
      });
    } else if (data.statusCode == 30006) {
      router.push({ path: "/login" });
      Message({
        type: "warning",
        showClose: true,
        duration: 2000,
        message: "登录超时!"
      });
    } else {
      Message({
        type: "warning",
        showClose: true,
        duration: 2000,
        message: "操作失败!"
      });
    }
    console.log(data);
    await dispatch("getListAction");
  },
  // 删除多
  async deleteListAction({ dispatch }, param) {
    console.log(param);
    let formDelete = {
      customersIds: param
    };
    console.log(formDelete);
    let result = await request.oDelete(api.CUSTOMERS_DELETE_API, formDelete);
    let data = result.data;
    if (data.statusCode == 10000) {
      Message({
        type: "success",
        showClose: true,
        duration: 2000,
        message: "删除成功!"
      });
    } else if (data.statusCode == 40001) {
      Message({
        type: "warning",
        showClose: true,
        duration: 2000,
        message: "业务逻辑异常，查看是否其它地方有引用此数据!"
      });
    } else if (data.statusCode == 30001) {
      router.push({ path: "/login" });
      Message({
        type: "warning",
        showClose: true,
        duration: 2000,
        message: "用户未登录!"
      });
    } else if (data.statusCode == 30006) {
      router.push({ path: "/login" });
      Message({
        type: "warning",
        showClose: true,
        duration: 2000,
        message: "登录超时!"
      });
    } else {
      Message({
        type: "warning",
        showClose: true,
        duration: 2000,
        message: "操作失败!"
      });
    }
    console.log(data);
    await dispatch("getListAction");
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};

//   {
//    newItem.work_id=item.workId;
// newItem.work_name=item.workName;
// newItem.parent_id=item.parentId;
// newItem.work_desc=item.workDesc;

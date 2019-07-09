
const state = {
  tableData:{
    list: [{
      id:1,
      clint_id: "66",
      format_id: "66",
      //规划
      format_name: "BBBB",

      clint_creator: "66",
      clint_createtime: "66",
      clint_updator: "66",
      clint_updatetime: "66"
    }],
    columns: [
      { id: 1, prop: 'clint_id', label: "公司编号" },
      { id: 2, prop: 'format_id', label: "规格编号" },
      { id: 3, prop: 'format_name', label: "规格名称" },
      { id: 14, prop: 'clint_creator', label: "创建人" },
      { id: 15, prop: 'clint_createtime', label: "创建时间" },
      { id: 16, prop: 'clint_updator', label: "修改人" },
      { id: 17, prop: 'clint_updatetime', label: "修改时间" }
    ],
    FromData: {
      clint_id: "",
      format_id: "66+",
      //规划
      format_name: "BBBB+",

      clint_creator: "",
      clint_createtime: "",
      clint_updator: "",
      clint_updatetime: ""
    }, //弹窗,
    total: 10 //list数据数量
  },
  changeIndex: "",
  Fromadd: "",
  nowTime:"",
};
const mutations = {
  setNowTime(state) {
    // (new Date()).Format("yyyy-MM-dd hh:mm:ss") ==> 2006-07-02 08:09:04
    // (new Date()).Format("yyyy-M-d h:m:s")      ==> 2006-7-2 8:9:4
    Date.prototype.Format = function(fmt) {
      var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          (this.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
      return fmt;
    };
    state.nowTime =(new Date()).Format("yyyy-MM-dd hh:mm:ss")
  },
  setFromadd(state, param) {
    state.Fromadd = param;
  },
  setChangeIndex(state, param) {
    state.changeIndex = param;
  },
  //增
  rowAddStore(state) {
    state.Fromadd.clint_id = sessionStorage.getItem("clint_id");
    state.Fromadd.clint_creator = sessionStorage.getItem("user_name");
    state.Fromadd.clint_createtime = state.nowTime
    state.tableData.list.unshift(state.Fromadd);

  },
  //改
  pwdChange(state) {
    state.Fromadd.clint_updator = sessionStorage.getItem("user_name");
    state.Fromadd.clint_updatetime = state.nowTime
    state.tableData.list.splice(state.changeIndex, 1, state.Fromadd);
  }
};




export default {
    namespaced: true,
    state,
    mutations

}

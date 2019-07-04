// import Mock from 'mockjs'
let data={
  columns: [
    { id: 1, prop: 'clint_id', label: "公司编号" },
    { id: 2, prop: 'material_id', label: "物料编号" },
    { id: 3, prop: 'material_type', label: "物料类型" },
    { id: 4, prop: 'material_name', label: "物料名称" },
    { id: 13, prop: 'format_id', label: "规格编号" },
    { id: 5, prop: 'material_unit', label: "物料单位" },
    { id: 6, prop: 'supplier_id', label: "供应商编号" },
    { id: 7, prop: 'material_erpid', label: "ERP-编号" },
    { id: 8, prop: 'material_indate', label: "EPR入库日期" },
    { id: 9, prop: 'material_storeid', label: "EPR入库编号" },
    { id: 10, prop: 'material_operaterid', label: "材料操作员编号" },
    { id: 11, prop: 'material_operaterdate', label: "材料操作日期" },
    { id: 12, prop: 'parent_id', label: "父级编号" },
    { id: 14, prop: 'clint_creator', label: "创建人" },
    { id: 15, prop: 'clint_createtime', label: "创建时间" },
    { id: 16, prop: 'clint_updator', label: "修改人" },
    { id: 17, prop: 'clint_updatetime', label: "修改时间" }
  ],
  // list: [],
  FromData: {
    clint_id: '',
    material_id: '',
    material_type: '',
    material_name: '',
    format_id: '',
    material_unit: '',
    supplier_id: '',
    material_erpid: '',
    material_indate: '',
    material_storeid: '',
    material_operaterid: '',
    material_operaterdate:'',
    parent_id:'',
    clint_creator: '',
    clint_createtime: '',
    clint_updator: '',
    clint_updatetime: '',
  },//弹窗
  // total:10//list数据数量
};


// for (let i = 0; i < data.total; i++) {
//   data.list.push(Mock.mock({
//     clint_id: /[a-z][0-9]{6}$/,
//     material_id: /[a-z][0-9]{6}$/,
//     material_type:/[A-Z][0-9]{2}$/,
//     material_name: Mock.Random.cname(),
//     format_id: /[a-z][0-9]{6}$/,
//     material_unit: '个',
//     supplier_id: /[A-Z][0-9]{6}$/,
//     material_erpid:/[A-Z][0-9]{6}$/,
//     material_indate: Mock.Random.date(),
//     material_storeid: /[a-z][0-9]{3}$/,
//     material_operaterid: /[a-z][0-9]{3}$/,
//     material_operaterdate:Mock.Random.date(),
//     parent_id:/[0-9]{3}$/,
//     clint_creator:/[a-z]{6}$/,
//     clint_createtime: Mock.Random.date(),
//     clint_updator:/[a-z]{6}$/,
//     clint_updatetime: Mock.Random.date()
//   }))
// }
export default data
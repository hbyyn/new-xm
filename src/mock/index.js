import Mock from 'mockjs'
let List = []
const count = 12

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    clint_id: Mock.Random.guid(),
    customers_id: Mock.Random.guid(),
    customers_name: Mock.Random.cname(),
    customers_tel: /^1[0-9]{10}$/,
    customers_address: Mock.mock('@county(true)'),
    customers_fax:/[0-9]{8}$/,
    clint_creator:/[a-z]{6}$/,
    clint_createtime: Mock.Random.date(),
    clint_updator:/[a-z]{6}$/,
    clint_updatetime: Mock.Random.date(),
  }))
}
let Cols=[
  { id: 1, prop: 'clint_id', label: "公司编号" },
  { id: 2, prop: 'customers_id', label: "客户编号" },
  { id: 3, prop: 'customers_name', label: "客户姓名" },
  { id: 4, prop: 'customers_tel', label: "客户电话" },
  { id: 5, prop: 'customers_address', label: "客户地址" },
  { id: 6, prop: 'customers_fax', label: "客户传真" },
  { id: 14, prop: 'clint_creator', label: "创建人" },
  { id: 15, prop: 'clint_createtime', label: "创建时间" },
  { id: 16, prop: 'clint_updator', label: "修改人" },
  { id: 17, prop: 'clint_updatetime', label: "修改时间" }
]


// 用户相关
Mock.mock('/customers/tabledate', 'get', List)
Mock.mock('/customers/cols', 'get', Cols)
// Mock.mock(/\/user\/batchremove/, 'get', tableAPI.batchremove)
// Mock.mock(/\/user\/add/, 'get', tableAPI.createUser)
// Mock.mock(/\/user\/edit/, 'get', tableAPI.updateUser)
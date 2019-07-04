import Mock from 'mockjs'
import customers from './customers'
import materials from './materials'
import all from './all'
import format from './format'
import product from './product'
import supplier from './supplier'
const api={
  customers,
  materials,
  all,
  format,
  product,
  supplier
};

// 用户相关
Mock.mock('/api/customers', 'get', api.customers)
Mock.mock('/api/materials', 'get', api.materials)
Mock.mock('/api/alllist', 'get', api.all)
Mock.mock('/api/format', 'get', api.format)
Mock.mock('/api/product', 'get', api.product)
Mock.mock('/api/supplier', 'get', api.supplier)
// Mock.mock(/\/user\/batchremove/, 'get', tableAPI.batchremove)
// Mock.mock(/\/user\/add/, 'get', tableAPI.createUser)
// Mock.mock(/\/user\/edit/, 'get', tableAPI.updateUser)
export default Mock
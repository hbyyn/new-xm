import Mock from 'mockjs'
import customers from './customers'
const api={
  customers,
};

// 用户相关
Mock.mock('/api/customers', 'get', api.customers)
export default Mock
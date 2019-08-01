// 开发环境
const DEV_HOST = 'https://easy-mock.com/mock/5d414b8449d6fd3f971c59a4';
// 测试环境
// const SET_HOST = 'https://';
// 生产环境
// const PRO_HOST = 'http://';


/*
说明： 用户接口
请求方式：GET
参数： 无
*/
const SETTING_TOTAL_API = '/api/customers';

/*
说明： 用户接口
请求方式：POST
参数： 无
*/
const SETTING_USER_API = '/api/user';

/*
说明： 用户接口
请求方式：POST
参数： 无
*/
const SETTING_ROLE_API = '/api/role';


export default {
    HOST: DEV_HOST,
    SETTING_TOTAL_API,
    SETTING_USER_API,
    SETTING_ROLE_API
}


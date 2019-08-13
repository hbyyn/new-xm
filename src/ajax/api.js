// 开发环境
const DEV_HOST = 'http://192.168.10.219:5687';
// 测试环境
// const SET_HOST = 'https://';
// 生产环境
// const PRO_HOST = 'http://';

/*
说明： 新增用户查接口
请求方式：GET
参数： 无
*/
// const USER_ADD_API = '/api/UserLogin/add';


/*
说明： 用户查询接口
请求方式：GET
参数： 无
*/
const USER_CHECK_API = '/api/UserLogin/check';


/*
说明： 用户登录接口
请求方式：GET
参数： 无
*/
const USER_LOGIN_API = '/api/UserLogin/login';

/*
说明： 用户修改接口
请求方式：POST
参数： 无
*/
const USER_CHANGE_API = '/api/UserLogin/private/change/password';

/*
说明： 用户注销接口
请求方式：POST
参数： 无
*/
const USER_LOGOUT_API = '/api/UserLogin/logout';

/*
说明： 规格数据
请求方式：POST
参数： 无
*/
const FORMAT_SELECT_API = '/api/Format/select';

/*
说明： 规格查询
请求方式：POST
参数： 无
*/
const FORMAT_BASE_API = '/api/Format/select/base';


/*
说明： 规格新增
请求方式：POST
参数： 无
*/
const FORMAT_ADD_API = '/api/Format/add/single';

/*
说明： 规格修改
请求方式：put
参数： 无
*/
const FORMAT_ADIT_API = '/api/Format/edit';

/*
说明： 规格删除
请求方式：delete
参数： 无
*/
const FORMAT_DELETE_SINGLE_API = '/api/Format/delete/single';

/*
说明： 规格删除
请求方式：delete
参数： 无
*/
const FORMAT_DELETE_API = '/api/Format/delete';


export default {
    HOST: DEV_HOST,
    // USER_ADD_API,
    USER_CHECK_API,
    USER_LOGIN_API,
    USER_CHANGE_API,
    USER_LOGOUT_API,
    FORMAT_SELECT_API,
    FORMAT_BASE_API,
    FORMAT_ADD_API,
    FORMAT_ADIT_API,
    FORMAT_DELETE_SINGLE_API,
    FORMAT_DELETE_API
}

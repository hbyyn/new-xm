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

////////////
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
说明： 规格选择删除
请求方式：delete
参数： 无
*/
const FORMAT_DELETE_API = '/api/Format/delete';

// Materials物料////////

/*
说明： 物料数据
请求方式：POST
参数： 无
*/
const MATERIALS_SELECT_API = '/api/Materials/select';

/*
说明： 物料查询
请求方式：POST
参数： 无
*/
const MATERIALS_BASE_API = '/api/Materials/select/base';


/*
说明： 物料新增
请求方式：POST
参数： 无
*/
const MATERIALS_ADD_API = '/api/Materials/add/single';

/*
说明： 物料修改
请求方式：put
参数： 无
*/
const MATERIALS_ADIT_API = '/api/Materials/edit';

/*
说明： 物料删除
请求方式：delete
参数： 无
*/
const MATERIALS_DELETE_SINGLE_API = '/api/Materials/delete/single';

/*
说明： 物料选择删除
请求方式：delete
参数： 无
*/
const MATERIALS_DELETE_API = '/api/Materials/delete';

///////product产品///////////////
/*
说明： 产品数据
请求方式：POST
参数： 无
*/
const PRODUCT_SELECT_API = '/api/Product/select';

/*
说明： 产品查询
请求方式：POST
参数： 无
*/
const PRODUCT_BASE_API = '/api/Product/select/base';


/*
说明： 产品新增
请求方式：POST
参数： 无
*/
const PRODUCT_ADD_API = '/api/Product/add/single';

/*
说明： 产品修改
请求方式：put
参数： 无
*/
const PRODUCT_ADIT_API = '/api/Product/edit';

/*
说明： 产品删除
请求方式：delete
参数： 无
*/
const PRODUCT_DELETE_SINGLE_API = '/api/Product/delete/single';

/*
说明： 产品选择删除
请求方式：delete
参数： 无
*/
const PRODUCT_DELETE_API = '/api/Product/delete';

// /////  SUPPLIER 供货商表///

/*
说明： 供货商表数据
请求方式：POST
参数： 无
*/
const SUPPLIER_SELECT_API = '/api/Supplier/select';

/*
说明： 供货商表查询
请求方式：POST
参数： 无
*/
const SUPPLIER_BASE_API = '/api/Supplier/select/base';


/*
说明： 供货商表新增
请求方式：POST
参数： 无
*/
const SUPPLIER_ADD_API = '/api/Supplier/add/single';

/*
说明： 供货商表修改
请求方式：put
参数： 无
*/
const SUPPLIER_ADIT_API = '/api/Supplier/edit';

/*
说明： 供货商表删除
请求方式：delete
参数： 无
*/
const SUPPLIER_DELETE_SINGLE_API = '/api/Supplier/delete/single';

/*
说明： 供货商表选择删除
请求方式：delete
参数： 无
*/
const SUPPLIER_DELETE_API = '/api/Supplier/delete';

// /////  CUSTOMERS  客户///

/*
说明： 客户表数据
请求方式：POST
参数： 无
*/
const CUSTOMERS_SELECT_API = '/api/Customers/select';

/*
说明： 客户表查询
请求方式：POST
参数： 无
*/
const CUSTOMERS_BASE_API = '/api/Customers/select/base';


/*
说明： 客户表新增
请求方式：POST
参数： 无
*/
const CUSTOMERS_ADD_API = '/api/Customers/add/single';

/*
说明： 客户表修改
请求方式：put
参数： 无
*/
const CUSTOMERS_ADIT_API = '/api/Customers/edit';

/*
说明： 客户表删除
请求方式：delete
参数： 无
*/
const CUSTOMERS_DELETE_SINGLE_API = '/api/Customers/delete/single';

/*
说明： 客户表选择删除
请求方式：delete
参数： 无
*/
const CUSTOMERS_DELETE_API = '/api/Customers/delete';

// /////  ORDER  订单///

/*
说明： 订单表数据
请求方式：POST
参数： 无
*/
const ORDER_SELECT_API = '/api/Order/select';

/*
说明： 订单表查询
请求方式：POST
参数： 无
*/
const ORDER_BASE_API = '/api/Order/select/base';


/*
说明： 订单表新增
请求方式：POST
参数： 无
*/
const ORDER_ADD_API = '/api/Order/add/single';

/*
说明： 订单表修改
请求方式：put
参数： 无
*/
const ORDER_ADIT_API = '/api/Order/edit';

/*
说明： 订单表删除
请求方式：delete
参数： 无
*/
const ORDER_DELETE_SINGLE_API = '/api/Order/delete/single';

/*
说明： 订单表选择删除
请求方式：delete
参数： 无
*/
const ORDER_DELETE_API = '/api/Order/delete';

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
    FORMAT_DELETE_API,
    MATERIALS_SELECT_API,
    MATERIALS_BASE_API,
    MATERIALS_ADD_API,
    MATERIALS_ADIT_API,
    MATERIALS_DELETE_SINGLE_API,
    MATERIALS_DELETE_API,
    PRODUCT_SELECT_API,
    PRODUCT_BASE_API,
    PRODUCT_ADD_API,
    PRODUCT_ADIT_API,
    PRODUCT_DELETE_SINGLE_API,
    PRODUCT_DELETE_API,
    SUPPLIER_SELECT_API,
    SUPPLIER_BASE_API,
    SUPPLIER_ADD_API,
    SUPPLIER_ADIT_API,
    SUPPLIER_DELETE_SINGLE_API,
    SUPPLIER_DELETE_API,
    CUSTOMERS_SELECT_API,
    CUSTOMERS_BASE_API,
    CUSTOMERS_ADD_API,
    CUSTOMERS_ADIT_API,
    CUSTOMERS_DELETE_SINGLE_API,
    CUSTOMERS_DELETE_API,
    ORDER_SELECT_API,
    ORDER_BASE_API,
    ORDER_ADD_API,
    ORDER_ADIT_API,
    ORDER_DELETE_SINGLE_API,
    ORDER_DELETE_API
}

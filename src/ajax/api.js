// 开发环境
const DEV_HOST = 'http://localhost:8080';
// 测试环境
const SET_HOST = 'http://129.204.72.71:8000';
// 生产环境
const PRO_HOST = 'http://129.204.72.71:80';


/*
说明： 商品总数接口
请求方式：GET
参数： 无
*/ 
const GOODS_TOTAL_API = '/api/goodsItem/total';

/*
说明： 首页菜单接口
请求方式：GET
参数： 无
*/ 
const HOME_MENU_API = '/api/catelist';

/*
说明： 首页轮播图接口
请求方式：GET
参数： 无
*/ 
const HOME_BANNER_API = '/api/home/bannerlist';

/*
首页分类数据接口
请求方式：GET
参数： 无
*/ 
const HOME_CATE_API = '/api/home/catelist';

/*
分类列表数接口
method: GET
params: id(Y)
*/
const HOME_CATE_DETAIL_API = '/api/home/catelist/itemlist';

export default {
    HOST: DEV_HOST,
    GOODS_TOTAL_API,
    HOME_BANNER_API,
    HOME_MENU_API,
    HOME_CATE_API,
    HOME_CATE_DETAIL_API
}


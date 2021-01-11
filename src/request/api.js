import request from './request'

/*请求首页数据*/
export const getHomeData = () => request.get('index/index')
/* 获取popup的数据 */
export const getPopupData = () => request.get('/search/index')

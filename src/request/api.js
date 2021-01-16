import request from './request'

// 请求首页数据
export const getHomeData = () => request.get('index/index')
// 获取popup的数据
export const getPopupData = () => request.get('/search/index')
// 搜索框商品搜索
export const getSearch = params => request.get('/goods/list', { params })
// 实时搜索功能
export const getTimeSearch = params => request.get('/search/helper', { params })
// 清除历史记录
export const clearHistory = () => request.post('/search/clearhistory')
// 登录
export const goLogin = params => request.post('/auth/loginByWeb', params)
// 查看商品详细信息
export const getProductDetail = params => request.get('/goods/detail', { params })
// 相关产品
export const getAboutProduct = params => request.get('/goods/related', { params })

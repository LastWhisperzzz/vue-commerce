/* 本地持久化存储工具类 */
// token
const COMMERCE_TOKEN = 'commerce_token'
// 用户登录信息
const USER_INFO = 'user_info'
export default {
  saveToken(token) {
    window.sessionStorage.setItem(COMMERCE_TOKEN, JSON.stringify(token))
  },
  getToken() {
    return JSON.parse(window.sessionStorage.getItem(COMMERCE_TOKEN) || '[]')
  },
  saveUser(user) {
    window.sessionStorage.setItem(USER_INFO, JSON.stringify(user))
  },
  getUser() {
    return JSON.parse(window.sessionStorage.getItem(USER_INFO) || '[]')
  }
}

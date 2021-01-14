import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home'),
    children: [
      {
        path: 'popup',
        name: 'MyPopup',
        component: () => import('../views/MyPopup')
      }
    ]
  },
  {
    path: '/topic',
    name: 'Topic',
    component: () => import('../views/Topic')
  },
  {
    path: '/category',
    name: 'Category',
    component: () => import('../views/Category')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart')
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/User')
  }
]

const router = new VueRouter({
  routes
})

/**
 * 导航守卫（前置导航守卫）
 * to 将要跳转的路由
 * from 将要离开路由
 * next  函数对象,用于跳转
 */
// router.beforeEach((to, from, next) => {
//   // 若要去购物车需要登录
//   if (to.path === '/cart') {
//     // 检查是否已经登录

//   }
// })

export default router

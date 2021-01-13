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

export default router

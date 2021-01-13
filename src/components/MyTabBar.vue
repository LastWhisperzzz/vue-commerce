<template>
  <!-- 所有页面底部导航tab -->
  <van-tabbar v-model="active">
    <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item replace to="/topic" icon="label-o">专题</van-tabbar-item>
    <van-tabbar-item replace to="/category" icon="apps-o">分类</van-tabbar-item>
    <van-tabbar-item replace to="/cart" icon="shopping-cart-o">购物车</van-tabbar-item>
    <van-tabbar-item replace to="/user" icon="user-o">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  name: 'TabBar',
  computed: {
    active: {
      get() {
        //获取当前路由的路径,主要用于选中哪一个tabbar
        const path = this.$route.path
        switch (path) {
          case '/home':
            return 0
          case '/topic':
            return 1
          case '/category':
            return 2
          case '/cart':
            return 3
          case '/user':
            return 4
          default:
            return 0
        }
      },
      set() {}
    }
  }
}
</script>

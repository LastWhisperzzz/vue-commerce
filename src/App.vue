<template>
  <div id="app">
    <router-view />
    <MyTabBar v-if="!($route.path === '/productDetail' || $route.path === '/home/popup')" />
  </div>
</template>

<script>
import MyTabBar from './components/MyTabBar'

export default {
  components: { MyTabBar }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #efefef;
  min-height: 100%;
}
html,
body {
  height: 100%;
}
html {
  font-size: 100px;
}
body {
  font-size: 0.14rem;
}
</style>

<template>
  <!-- 底部导航首页 -->
  <div class="home">
    <!--处理首页内容过长会增加到/home/popup下面-->
    <div v-if="$route.path === '/home'">
      <van-search placeholder="请输入搜索关键词" shape="round" disabled @click="gotoPopup" />
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in banner" :key="item.id">
          <img :src="item.image_url" width="100%" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <transition name="van-slide-right">
      <router-view v-if="$route.path === '/home/popup'" />
    </transition>
  </div>
</template>

<script>
import { getHomeData } from '../request/api'

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      //轮播图
      banner: [],
      //首页频道
      channel: [],
      //首页品牌制作商直供
      brandList: [],
      //推荐内容
      goodsLIst: []
    }
  },
  created() {
    getHomeData().then(res => {
      const { banner, channel, brandList } = res.data
      console.log(res)
      this.banner = banner
      this.channel = channel
      this.brandList = brandList
    })
  },
  methods: {
    gotoPopup() {
      this.$router.push('/home/popup')
    }
  }
}
</script>

<style lang="scss" scoped></style>

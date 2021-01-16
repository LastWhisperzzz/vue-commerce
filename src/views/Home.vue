<template>
  <!-- 底部导航首页 -->
  <div class="home">
    <!--处理首页内容过长会增加到/home/popup下面-->
    <div v-if="$route.path === '/home'">
      <van-search placeholder="请输入搜索关键词" shape="round" disabled @click="gotoPopup" />
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in banner" :key="item.id">
          <img :src="item.image_url" width="100%" style="display:block;" />
        </van-swipe-item>
      </van-swipe>
      <!-- 首页频道 -->
      <van-grid :column-num="5">
        <van-grid-item
          v-for="(item, i) in channel"
          :key="i"
          :icon="item.icon_url"
          :text="item.name"
        ></van-grid-item>
      </van-grid>
      <!--品牌制造商直供-->
      <div class="title">品牌制造商直供</div>
      <ul class="brand">
        <li v-for="item in brandList" :key="item.id">
          <img :src="item.pic_url" />
          <h4>{{ item.name }}</h4>
          <div>{{ item.floor_price | filterMoney }}</div>
        </li>
      </ul>
      <!-- 推荐内容 -->
      <div class="like">
        <div class="title">猜你喜欢</div>
        <Product :goodsList="goodsList" />
      </div>
    </div>

    <transition name="van-slide-right">
      <router-view v-if="$route.path === '/home/popup'" />
    </transition>
  </div>
</template>

<script>
import { getHomeData, getSearch } from '../request/api'
import Product from '../components/Product'

export default {
  name: 'Home',
  components: { Product },
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
    /**
     * 获取推荐信息,应该从数据库中获取到用户常用关键词
     * 分别用这些关键词搜索数据,然后添加到列表中显示
     */
    getSearch({ keyword: '日式' }).then(res => {
      const { goodsList } = res.data
      this.goodsList = goodsList
    })
  },
  methods: {
    gotoPopup() {
      this.$router.push('/home/popup')
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  background: #fff;
  height: 0.5rem;
  line-height: 0.5rem;
  text-align: center;
  margin-top: 0.2rem;
}
.brand {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background: #fff;
  li {
    width: 49%;
    position: relative;
    margin-bottom: 0.1rem;
    img {
      width: 100%;
      display: block;
      // filter: brightness();
    }
    h4 {
      position: absolute;
      left: 10px;
      top: 0;
      line-height: 0.4rem;
    }
    div {
      position: absolute;
      left: 10px;
      top: 0.4rem;
      line-height: 0.4rem;
      color: darkred;
    }
  }
}
.like {
  background: #fff;
  padding-bottom: 1rem;
}
</style>

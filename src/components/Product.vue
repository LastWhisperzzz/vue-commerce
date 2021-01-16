<template>
  <!-- 展示单个商品简略信息 -->
  <div class="container">
    <van-grid :column-num="2" :border="false">
      <van-grid-item v-for="item in goodsList" :key="item.id" @click="clickItem(item.id)">
        <!-- 使用插槽自定义样式 -->
        <template>
          <img :src="item.list_pic_url" style="width:100%;height:100%" />
          <div class="van-ellipsis">{{ item.name }}</div>
          <div class="price">￥{{ item.retail_price }}元</div>
        </template>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {
  name: 'Product',
  props: ['goodsList'],
  methods: {
    clickItem(id) {
      console.log(id)
      this.$router.push('/productDetail?id=' + id)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background-color: #efefef;
  .van-grid {
    padding: 0.1rem 2%;
    .van-grid-item {
      padding: 1%;
      width: 49%;
      .price {
        color: red;
      }
    }
  }
}
</style>

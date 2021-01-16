<template>
  <!-- 商品详情页底部商品导航 -->
  <div>
    <van-goods-action>
      <van-goods-action-icon
        :icon="isCollect ? 'star' : 'star-o'"
        :text="isCollect ? '已收藏' : '收藏'"
        :color="isCollect ? 'red' : '#666'"
        @click="collect(!isCollect)"
      />
      <van-goods-action-icon icon="cart-o" text="购物车" :badge="badge" @click="goCart" />
      <van-goods-action-button type="warning" text="加入购物车" @click="openSku" />
      <van-goods-action-button type="danger" text="立即购买" @click="openSku" />
    </van-goods-action>
  </div>
</template>

<script>
export default {
  name: 'MyGoodsActions',
  props: ['badge'],
  data() {
    return {
      //控制收藏显示
      isCollect: false
    }
  },
  methods: {
    //打开sku
    openSku() {
      this.$emit('openSku')
    },
    //收藏
    collect(isCollect) {
      //发送到后台请求,收藏成功之后再更新状态
      this.$toast.success('成功')
      this.isCollect = isCollect
    },
    //去购物车页面
    goCart() {
      this.$router.push('/cart')
    }
  }
}
</script>

<style>
/* .van-goods-action {
  z-index: 9999;
} */
</style>

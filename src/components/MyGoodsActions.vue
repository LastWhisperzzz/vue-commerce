<template>
  <!-- 商品详情页底部商品导航 -->
  <div>
    <van-goods-action>
      <van-goods-action-icon
        :icon="isCollect ? 'star' : 'star-o'"
        :text="isCollect ? '已收藏' : '未收藏'"
        :color="isCollect ? 'red' : '#666'"
        @click="collect(!isCollect)"
      />
      <van-goods-action-icon icon="cart-o" text="购物车" />
      <van-goods-action-button type="warning" text="加入购物车" />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
export default {
  name: 'MyGoodsActions',
  data() {
    return {
      //控制收藏显示
      isCollect: false,
      //购物车数量
      badge: 0
    }
  },
  methods: {
    //收藏
    collect(isCollect) {
      //发送到后台请求,收藏成功之后再更新状态
      this.$toast.success('成功')
      this.isCollect = isCollect
    }
  }
}
</script>

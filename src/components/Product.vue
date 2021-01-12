<template>
  <!-- 展示单个商品简略信息 -->
  <div>
    <van-grid :column-num="2" :border="false">
      <van-grid-item
        v-for="item in goodsList"
        :key="item.id"
        @click="clickItem(item.id)"
      >
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
    clickItem() {}
  }
}
</script>

<style lang="scss" scoped>
.price {
  /* font-weight: bold; */
  color: red;
}

// .van-grid {
//   padding: 2%;
//   .van-grid-item {
//     padding: 1%;
//     width: 49%;
//   }
// }
</style>

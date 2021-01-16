<template>
  <!-- 商品详情页定制 -->
  <van-row>
    <van-col span="8"><van-icon color="darkred" name="checked" />30天无忧退换</van-col>
    <van-col span="8"><van-icon color="darkred" name="checked" />48小时快速退费</van-col>
    <van-col span="8"><van-icon color="darkred" name="checked" />满88元包邮</van-col>
  </van-row>
</template>

<script>
export default {
  name: 'Tips'
}
</script>

<style scoped>
.van-row {
  text-align: center;
  line-height: 0.3rem;
}
</style>

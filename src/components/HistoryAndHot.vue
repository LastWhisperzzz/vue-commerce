<template>
  <!-- 历史与热门 -->
  <div>
    <van-row>
      <van-col class="title" span="22">历史记录</van-col>
      <van-col span="2">
        <van-icon name="delete-o" @click="clearTag" />
      </van-col>
    </van-row>
    <van-row gutter="10">
      <van-col v-for="(item, i) in historyKeywordList" :key="i">
        <van-tag plain type="default">{{ item }}</van-tag>
      </van-col>
    </van-row>

    <van-row>
      <van-col class="title" span="24">热门搜索</van-col>
    </van-row>
    <van-row gutter="10">
      <van-col v-for="(item, i) in hotKeywordList" :key="i">
        <van-tag plain :type="item.is_hot == 1 ? 'danger' : 'default'">{{
          item.keyword
        }}</van-tag>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  name: 'HistoryAndHot',
  props: ['historyKeywordList', 'hotKeywordList'],
  methods: {
    //清空标签
    clearTag() {
      //应该发送请求到服务器端进行清除,本地清除没有意义
    }
  }
}
</script>

<style scoped>
.van-row {
  padding: 0.05rem;
}

.van-col {
  padding: 0.05rem;
}

.title {
  font-weight: bold;
}
</style>

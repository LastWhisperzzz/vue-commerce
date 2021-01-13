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
        <van-tag plain type="default" @click="tagClick(item)">{{ item }}</van-tag>
      </van-col>
    </van-row>

    <van-row>
      <van-col class="title" span="24">热门搜索</van-col>
    </van-row>
    <van-row gutter="10">
      <van-col v-for="(item, i) in hotKeywordList" :key="i">
        <van-tag
          plain
          :type="item.is_hot == 1 ? 'danger' : 'default'"
          @click="tagClick(item.keyword)"
          >{{ item.keyword }}</van-tag
        >
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { clearHistory } from '../request/api'

export default {
  name: 'HistoryAndHot',
  props: ['historyKeywordList', 'hotKeywordList'],
  methods: {
    tagClick(keyword) {
      this.$emit('tagClick', keyword)
    },
    //清空历史
    clearTag() {
      clearHistory().then(res => {
        if (res) this.$toast('清除成功')
      })
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

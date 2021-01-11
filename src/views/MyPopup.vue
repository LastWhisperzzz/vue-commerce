<template>
  <!-- 点击首页搜索弹出框 -->
  <div class="popup">
    <van-search
      v-model="searcherValue"
      :placeholder="placeHolder"
      show-action
      shape="round"
      @search="onSearch"
      @cancel="onCancel"
      @input="inputChange"
    />

    <!-- 传递给子组件 -->
    <HistoryAndHot
      :historyKeywordList="historyKeywordList"
      :hotKeywordList="hotKeywordList"
    />
  </div>
</template>

<script>
import HistoryAndHot from '../components/HistoryAndHot'
import { getPopupData } from '../request/api'

export default {
  name: 'MyPopup',
  components: { HistoryAndHot },
  data() {
    return {
      searcherValue: '',
      placeHolder: '',
      //区块显示
      //1代表历史记录与热门区块搜索
      //2代表列表区块
      //3代表产品区块
      blockShow: 1,
      //热门搜索
      hotKeywordList: [],
      //历史记录
      historyKeywordList: [],
      //搜索的商品信息
      goodsList: [],
      searchList: [],
      //分类信息
      filterCategory: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 }
      ]
    }
  },
  created() {
    getPopupData().then(res => {
      console.log(res)
      const { defaultKeyword, historyKeywordList, hotKeywordList } = res.data
      this.placeHolder = defaultKeyword.keyword
      //传递给子组件
      this.historyKeywordList = historyKeywordList
      this.hotKeywordList = hotKeywordList
    })
  },
  methods: {
    inputChange() {},
    onSearch() {},
    onCancel() {
      this.$router.push('/home')
    }
  }
}
</script>

<style lang="scss" scoped>
.popup {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  // z-index: 99;
  background-color: #f7f8fa;
}
</style>

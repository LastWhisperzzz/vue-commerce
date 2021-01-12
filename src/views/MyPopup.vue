<template>
  <!-- 点击首页搜索弹出框 -->
  <div class="popup">
    <van-search
      v-model="searcherValue"
      :placeholder="placeHolder"
      show-action
      shape="round"
      clearable
      @clear="onClear"
      @search="onSearch"
      @cancel="onCancel"
      @input="inputChange"
    />

    <!-- 传递给子组件 -->
    <HistoryAndHot
      v-if="blockShow === 1"
      :historyKeywordList="historyKeywordList"
      :hotKeywordList="hotKeywordList"
      @tagClick="tagClick"
    />
    <MyList
      v-else-if="blockShow === 2"
      :searchList="searchList"
      @cellClick="tagClick"
    />
    <MyProduct
      v-else
      :goodsList="goodsList"
      :filterCategory="filterCategory"
      @categoryChange="categoryChange"
      @priceChange="priceChange"
    />
  </div>
</template>

<script>
import HistoryAndHot from '../components/HistoryAndHot'
import MyProduct from '../components/MyProduct'
import MyList from '../components/MyList'
import { getPopupData, getSearch, getTimeSearch } from '../request/api'

export default {
  name: 'MyPopup',
  components: { HistoryAndHot, MyProduct, MyList },
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
      //实时搜索提示信息
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
      const { defaultKeyword, historyKeywordList, hotKeywordList } = res.data
      this.placeHolder = defaultKeyword.keyword
      //传递给子组件
      this.historyKeywordList = historyKeywordList
      this.hotKeywordList = hotKeywordList
    })
  },
  methods: {
    /**
     * 执行搜索操作
     * @param keyword 搜索关键词
     * @param page 当前页数
     * @param size 每页显示的条数
     * @param order 排序方式,支持desc降序,asc升序
     * @param categoryId 分类id
     * @param sort  排序方式可以是id或者price
     */
    onSearch({
      keyword = this.searcherValue,
      page = 1,
      size = 20,
      order = 'desc',
      categoryId = 0,
      sort = 'id'
    }) {
      //查询条件
      const queryCondition = { keyword, page, size, order, categoryId, sort }
      getSearch(queryCondition).then(res => {
        // 切换到产品区块
        this.blockShow = 3
        // 传递给子组件
        const { goodsList, filterCategory } = res.data
        this.goodsList = goodsList
        //处理filterCategory设置为text和value
        let arr = JSON.parse(
          JSON.stringify(filterCategory)
            .replace(/name/g, 'text')
            .replace(/id/g, 'value')
        )
        this.filterCategory = arr
      })
    },
    /**
     * 搜索输入框内容发生改变
     * @param keyword 搜索关键词
     */
    inputChange(keyword) {
      if (keyword.trim().length > 0) {
        this.blockShow = 2
        getTimeSearch({ keyword }).then(res => {
          this.searchList = res.data
        })
      } else {
        // 清空
        this.searchList = []
      }
    },
    onCancel() {
      this.$router.push('/home')
    },
    onClear() {
      this.blockShow = 1
    },
    categoryChange(val) {
      this.onSearch({ categoryId: val })
    },
    priceChange(val) {
      this.onSearch({ order: val, sort: 'price' })
    },
    tagClick(keyword) {
      this.searcherValue = keyword
      this.onSearch(keyword)
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
  right: 0;
  z-index: 99;
  background-color: #efefef;
}
</style>

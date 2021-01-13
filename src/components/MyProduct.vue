<template>
  <!-- 搜索下拉向下弹出的菜单列表,以及商品简略信息 -->
  <div>
    <van-dropdown-menu>
      <van-dropdown-item title="综合" disabled />
      <van-dropdown-item
        title="价格"
        v-model="priceValue"
        :options="option2"
        @change="priceChange"
      />
      <van-dropdown-item
        title="分类"
        v-model="catagoryValue"
        :options="filterCategory"
        @change="categoryChange"
      />
    </van-dropdown-menu>
    <van-empty v-if="goodsList.length == 0" image="search" description="搜索的产品不存在" />
    <Product v-else :goodsList="goodsList" />
  </div>
</template>

<script>
import Product from './Product'

export default {
  name: 'MyProduct',
  components: { Product },
  props: ['goodsList', 'filterCategory'],
  data() {
    return {
      priceValue: 0,
      // 选中的当前分类
      catagoryValue: 0,
      // 价格下拉菜单选项
      option2: [
        { text: '由高到低', value: 'desc' },
        { text: '由低到高', value: 'asc' }
      ]
    }
  },
  mounted() {
    // 遍历数组，设置选中分类
    this.filterCategory.forEach(item => {
      if (item.checked) {
        this.catagoryValue = item.value
      }
    })
  },
  methods: {
    priceChange(value) {
      this.$emit('priceChange', value)
    },
    categoryChange(value) {
      this.$emit('categoryChange', value)
    }
  }
}
</script>

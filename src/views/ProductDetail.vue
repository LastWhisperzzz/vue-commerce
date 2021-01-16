<template>
  <!-- 商品详情页 -->
  <div>
    <!--轮播图-->
    <van-swipe autoplay="3000">
      <van-swipe-item v-for="image in gallery" :key="image.id">
        <van-image width="100%" height="3rem" :src="image.img_url" />
      </van-swipe-item>
    </van-swipe>
    <Tips />
    <!-- 简单描述信息 -->
    <div class="info">
      <h3>{{ info.name }}</h3>
      <p>{{ info.goods_brief }}</p>
      <p class="price">{{ info.retail_price | filterMoney }}</p>
    </div>
    <van-cell class="showSku" title="展示弹出层" is-link />
    <!-- 商品参数 -->
    <div class="attribute">
      <h4>商品参数</h4>
      <ul>
        <li v-for="(item, i) in attribute" :key="i">
          <span>{{ item.name }}</span>
          <section class="van-ellipsis">{{ item.value }}</section>
        </li>
      </ul>
    </div>
    <!--细节图,后台设计有问题,后续更改只需要传递图片路径过来即可,不需要传递整个标签-->
    <!-- <ul>
      <li v-for="(desc, index) in info_desc" :key="index">
        <van-image width="100%" height="100%" :src="desc" />
      </li>
    </ul> -->
    <div class="box" ref="box"></div>
    <!-- 常见问题 -->
    <div class="title">
      <span>常见问题</span>
    </div>
    <ul class="issue">
      <li v-for="item in issue" :key="item.id">
        <h3>{{ item.question }}</h3>
        <p>{{ item.answer }}</p>
      </li>
    </ul>
    <!-- 相关产品列表 -->
    <div class="title">
      <span>大家都在看</span>
    </div>
    <Product :goodsList="goodsList" />
    <MyGoodsActions />
  </div>
</template>

<script>
import { getProductDetail, getAboutProduct } from '../request/api'
import Tips from '../components/Tips'
import Product from '../components/Product'
import MyGoodsActions from '../components/MyGoodsActions'

export default {
  name: 'ProductDetail',
  components: { Tips, Product, MyGoodsActions },
  data() {
    return {
      //轮播图
      gallery: [],
      //商品信息
      info: {},
      //商品参数
      attribute: [],
      //详细的图片描述
      info_desc: [
        'https://img.alicdn.com/imgextra/i4/2207974795337/O1CN01K0AK9Z1pIOPsB4O6k_!!2207974795337-0-scmitem176000.jpg',
        'https://img.alicdn.com/imgextra/i1/2207974795337/O1CN011DS6rg1pIOPznMVNK_!!2207974795337-0-scmitem176000.jpg',
        'https://img.alicdn.com/imgextra/i2/2207974795337/O1CN01jq9U2e1pIOPmUhF2P_!!2207974795337-0-scmitem176000.jpg'
      ],
      //常见问题
      issue: [],
      //相关产品
      goodsList: []
    }
  },
  created() {
    const id = this.$route.query.id
    this.initData(id)
  },
  methods: {
    // 初始化数据
    initData(id) {
      getProductDetail({ id }).then(res => {
        console.log(res)
        const { gallery, info, attribute, issue } = res.data
        this.gallery = gallery
        this.info = info
        this.attribute = attribute
        this.issue = issue
        this.$refs.box.innerHTML = info.goods_desc
        //获取相关产品
        getAboutProduct({ id }).then(res => {
          this.goodsList = res.data.goodsList
        })
      })
    },
    back() {
      this.$router.push('/home/popup')
    }
  }
}
</script>

<style lang="scss" scoped>
.info {
  background: white;
  text-align: center;
  padding: 0.2rem 0;
  h3 {
    font-weight: normal;
    font-size: 0.2rem;
    line-height: 0.5rem;
  }
  p {
    color: #999;
    font-size: 0.14rem;
    line-height: 0.3rem;
  }
  .price {
    color: darkred;
  }
}

.showSku {
  margin-bottom: 0.2rem;
  border-top: 1px solid #ccc;
}
.attribute {
  background: #fff;
  padding: 0.2rem 4%;
  h4 {
    font-weight: normal;
    font-size: 0.16rem;
    margin-bottom: 0.1rem;
  }
  ul {
    li {
      display: flex;
      justify-content: space-between;
      height: 0.4rem;
      line-height: 0.4rem;
      background: #efefef;
      border-radius: 4px;
      margin-bottom: 0.1rem;
      span {
        width: 20%;
        text-align: right;
      }
      section {
        flex: 1;
        padding-left: 0.2rem;
      }
    }
  }
}

::v-deep.box {
  img {
    width: 100%;
    display: block;
  }
}

.title {
  width: 100&;
  height: 0.5rem;
  background: #fff;
  position: relative;
  &::before {
    content: '';
    width: 50%;
    height: 2px;
    background: #ccc;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -1px;
    margin-left: -25%;
  }
  span {
    position: relative;
    display: block;
    width: 30%;
    text-align: center;
    margin: 0 auto;
    height: 0.5rem;
    line-height: 0.5rem;
    background: #fff;
    z-index: 99;
  }
}
.issue {
  padding: 0 4%;
  background: #fff;
  li {
    h3 {
      height: 0.3rem;
      line-height: 0.3rem;
      padding-left: 0.2rem;
      font-weight: normal;
      position: relative;
      &::before {
        content: '';
        display: inline-block;
        width: 4px;
        height: 4px;
        background: darkred;
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -2px;
      }
    }
    p {
      font-size: 0.12rem;
      line-height: 0.2rem;
      padding-left: 0.2rem;
    }
  }
}
</style>

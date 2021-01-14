<template>
  <!-- 底部导航用户页 -->
  <div class="user">
    <van-row>
      <van-col span="8">
        <img :src="avatar" />
      </van-col>
      <van-col span="14" @click="clickUser">{{ nickName }}</van-col>
      <van-col span="2">
        <van-icon name="arrow" />
      </van-col>
    </van-row>
    <!-- 登录界面 -->
    <div class="login_modal" v-if="showForm">
      <section @click="closeModal"></section>
      <van-form validate-first @submit="onSubmit">
        <van-field
          colon
          label="用户名"
          v-model="username"
          placeholder="用户名"
          :rules="[
            { required: true, message: '请填写用户名' },
            { validator, message: '请输入正确内容' }
          ]"
        />
        <van-field
          colon
          label="密码"
          v-model="password"
          placeholder="密码"
          type="password"
          :rules="[
            { required: true, message: '请填写密码' },
            { validator, message: '请输入正确内容' }
          ]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </div>
    <van-grid :column-num="3" square>
      <van-grid-item
        @click="clickItem"
        v-for="(item, index) in gridData"
        :key="index"
        :icon="item.icon"
        :text="item.text"
      />
    </van-grid>
  </div>
</template>

<script>
import { goLogin } from '../request/api'
import storageUtil from '../util/storageUtil'

export default {
  name: 'User',
  data() {
    return {
      avatar: require('../assets/images/avatar.png'),
      nickName: '点击登录',
      showForm: false,
      username: '',
      password: '',
      gridData: [
        { value: 0, text: '我的订单', icon: 'orders-o' },
        { value: 1, text: '优惠券', icon: 'cash-on-deliver' },
        { value: 2, text: '礼品卡', icon: 'gift-o' },
        { value: 3, text: '我的收藏', icon: 'goods-collect-o' },
        { value: 4, text: '我的足迹', icon: 'location-o' },
        { value: 5, text: '会员福利', icon: 'manager-o' },
        { value: 6, text: '地址管理', icon: 'setting-o' },
        { value: 7, text: '账号安全', icon: 'warn-o' },
        { value: 8, text: '联系客服', icon: 'service-o' },
        { value: 9, text: '帮助中心', icon: 'question-o' },
        { value: 10, text: '意见反馈', icon: 'service-o' }
      ]
    }
  },
  created() {
    if (storageUtil.getToken().length > 0) {
      const userInfo = storageUtil.getUser()
      this.avatar = userInfo.avatar
      this.nickName = userInfo.nickName
    } else {
      this.showForm = true
    }
  },
  methods: {
    //登录
    onSubmit() {
      const { username, password } = this
      goLogin({ username, password })
        .then(res => {
          console.log(res)
          if (res.errno == 0) {
            const { token, userInfo } = res.data
            //存储token与用户信息
            storageUtil.saveToken(token)
            storageUtil.saveUser(userInfo)
            this.$toast.success('登录成功!')
            //修改头像昵称并关闭弹框
            this.avatar = userInfo.avatar
            this.nickName = userInfo.nickName
            this.showForm = false
          } else {
            this.$toast.fail('登录失败!')
          }
        })
        .catch(() => {
          this.$toast.fail('登录失败!')
        })
    },
    //点击当前用户名
    clickUser() {
      // 判断是否已登录
      if (!storageUtil.getToken().length > 0) {
        this.showForm = true
      }
    },
    //关闭模态层和登录窗口
    closeModal() {
      this.showForm = false
    },
    validator(val) {
      return val.trim().length > 0
    },
    clickItem() {
      this.$toast.fail('功能暂未开放!')
    }
  }
}
</script>

<style lang="scss" scoped>
.van-row {
  padding: 0.2rem 4%;
  color: white;
  background-color: black;
  .van-col {
    line-height: 0.8rem;
  }
  img {
    width: 0.8rem;
    /*使图片变圆*/
    border-radius: 50%;
    display: block;
  }
}

.login_modal {
  width: 100%;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 99;
  section {
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
  }
  .van-form {
    position: absolute;
    top: 35vh;
    left: 50%;
    margin-left: -45%;
    background: #fff;
    width: 90%;
    padding: 0.1rem;
    box-sizing: border-box;
  }
}
</style>

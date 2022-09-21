<template>
  <div class="user-container">
    <!-- 用户基本信息面板 -->
    <div class="user-card">
      <!-- 用户头像、姓名 -->
      <van-cell>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #icon>
          <img :src="user.photo" alt="" class="avatar">
        </template>
        <template #title>
          <span class="username">用户名</span>
        </template>
        <template #label>
          <van-tag color="#fff" text-color="#007bff">申请认证</van-tag>
        </template>
      </van-cell>
      <!-- 动态、关注、粉丝 -->
      <div class="user-data">
        <div class="user-data-item">
          <span>{{user.art_count}}</span>
          <span>动态</span>
        </div>
        <div class="user-data-item">
          <span>{{user.follow_count}}</span>
          <span>关注</span>
        </div>
        <div class="user-data-item">
          <span>{{user.fans_count}}</span>
          <span>粉丝</span>
        </div>
      </div>
    </div>

    <!-- 操作面板 -->
    <van-cell-group class="action-card">
      <!-- 点击编辑选项单元格, 跳转路由 -->
      <van-cell icon="edit" title="编辑资料" is-link  to='/user_editor'/>
      <van-cell icon="chat-o" title="小思同学" is-link />
      <van-cell icon="warning-o" title="退出登录" is-link @click="quit" />
    </van-cell-group>
  </div>
</template>

<script>
import { getUserInfoAPI } from '@/api/index.js'
import { mapMutations } from 'vuex'
import { Dialog } from 'vant'
export default {
  ...mapMutations(['setToken']),
  data() {
    return {
      user: {} // 用户对象
    }
  },
  async created() {
    const {data: res} = await getUserInfoAPI()
    console.log('user', res)
    this.user = res.data
  },
  methods: {
    quit() {
      Dialog.confirm({
        title: '提示',
        message: '这就走了?不爱我了吗?'
      }).then(() => {
      
        // 清空vuex和本地
        console.log("清空vuex和本地",this)
        // this.setToken('')
        // 跳到登录页
        localStorage.setItem('token', '')
        this.$router.replace('/login')
      }).catch((err) => {
        // on cancel
        return err;
      })
    },

  }

}
</script>

<style scoped lang="less">

.user-container {
  .user-card {
    background-color: #007bff;
    color: white;
    padding-top: 20px;
    .van-cell {
      background: #007bff;
      color: white;
      &::after {
        display: none;
      }
      .avatar {
        width: 60px;
        height: 60px;
        background-color: #fff;
        border-radius: 50%;
        margin-right: 10px;
      }
      .username {
        font-size: 14px;
        font-weight: bold;
      }
    }
  }
  .user-data {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-size: 14px;
    padding: 30px 0;
    .user-data-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 33.33%;
    }
  }
}
</style>
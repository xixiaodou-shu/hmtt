<template>
    <div>
   <!-- 二级路由页面  占位符-->
   <div class="layout_container">
    <router-view></router-view>
  </div>
    <!-- 下面底部导航 -->
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" to="/layout/home">主页</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/layout/user">我的</van-tabbar-item>
    </van-tabbar>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    }
  }
}
</script>

<style lang="less" scoped>
.layout_container {
  /* 内容底部内边距(把内容往上挤压, 防止内部被底部导航挡住) */
  padding-bottom: 50px;
/* 底部导航上边框 */
}
.van-tabbar {
  border-top: 1px solid #f8f8f8;
}
</style>
<template>
  <div id="app">
    <!-- 防止组件频繁创建和销毁
         防止网络请求重复无用执行 -->
    <!-- <router-view></router-view> -->
    <!-- <keep-alive :exclude="['ArticleDetail', 'MyLogin', 'Search', 'SearchResult']"> -->
      <router-view></router-view>
    <!-- </keep-alive> -->
  </div>
</template>
<script>

export default {
  components: {
  }
}
</script>

<style lang="less">

</style>

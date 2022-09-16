<template>
  <div>
     <!-- 搜索结果页-头部导航 -->
    <div class="search-result-container">
        <!-- 点击实现后退效果 -->
        <van-nav-bar
          title="搜索结果"
          left-arrow
          @click-left="$router.go(-1)"
          fixed
        />
    </div>
    <!-- 搜索结果 -->
    <div>
        <article-item></article-item>
    </div>
  </div>
</template>

<script>
import ArticleItem from '@/views/Home/components/ArticleItem.vue'
import { getSearchResultAPI } from '@/api/index.js'
export default {
  components: {
    ArticleItem
  },
  data() {
    return {
      page: 1,

    }
  },
  // 接口有问题待完善
  async created() {
    console.log('动态路由参数名SearchResult:', this.$route.params.keywords)
    // 拿到关键词, keywords来源于router/index.js你定义的动态路由参数名
    const { data: res }  = await getSearchResultAPI(this.$route.params.keywords ,this.page)
    
    console.log(res)

  }

}
</script>

<style lang="less" scoped>
.search-result-container {
  padding-top: 46px;
}
.nav-bar-icon-color{
  background: white;
}
</style>
<template>
<div>
  <!-- 下拉刷新 -->
 <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <!-- 底部加载更多 offset 	滚动条与底部距离小于 offset 时触发load事件-->
    <!-- immediate-check是否在初始化时立即执行滚动位置检查 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
     
      :immediate-check="false"
    >
    <!-- 文章列表 -->
    <!-- 组件绑定原生的点击事件@click.native 用@click不行 (使用修饰符) -->
    
      <article-item
        v-for="item in articleList"
        :key="item.art_id"
        :obj="item"
        @dislike="dislikeFn"
        @reports="reportsFn"
        @click.native="$router.push(`/article_detail?aid=${item.art_id}`)"
      ></article-item>
    </van-list>
  </van-pull-refresh>
</div>


</template>

<script>
import ArticleItem from './components/ArticleItem.vue'
import { getArtListAPI, dislikeArticleAPI, removeArticle } from '@/api/index.js'
import { timeAgo } from '@/untils/date.js'
import { Notify } from 'vant'

export default {
  props: {
    cid: Number
  },
  components: {
    ArticleItem
  },
  data() {
    return {
       timestamp: Date.now(),  // 时间戳
       nextTime: null, //  用于加载更多(分页)
       articleList: [],
       loading: false,  // 底部加载状态
       finished: false, //数据是否全部加载完毕
       isLoading: false, //下拉刷新
    }
  },
  methods: {
    // 底部加载
    onLoad() {
      // 有第一页数据以后, onLoad再发请求
      if (this.articleList.length > 0) {
        this.getArticleList ()
        console.log(" 底部加载")
      }
    },
    // 上拉刷新
    onRefresh() {
      console.log("上拉加载", this.isLoading )
      this.nextTime = null
      this.articleList = []
      this.getArticleList()
      this.isLoading = false // 顶部加载状态关闭 不关闭一直有圈圈
    },
    async  getArticleList () {
      console.log("channelID", this.cid)
      this.nextTime === null ? this.nextTime = this.timestamp : this.nextTime 
      const res = await getArtListAPI(this.cid, this.nextTime)
      // 回来的数据进行预处理, 把时间转成多久多久之前
      res.data.data.results.forEach(item => {
        item.pubdate = timeAgo(item.pubdate)
      })
      // 如果无数据
      if(res.data.data.results.length === 0) {
        this.finished = true // // 告诉list组件直接底部显示没有更多数据
      } else {
        this.nextTime = res.data.data.pre_timestamp //  保存下一页数据的时间(做分页用)
        // console.log("this.nextTime", this.nextTime)
        // 异步数据加载完毕, 合并数据,
        this.articleList = [...this.articleList, ...res.data.data.results]
        // 等待网络请求结果后
        this.loading = false // 底部加载更多状态
      }  
    },
    async dislikeFn(articleId) {
      console.log("articleId", articleId)
      try {
        await dislikeArticleAPI(articleId)
        Notify({ type: 'success', message: '反馈成功' })
      } catch (error) {
        Notify({ type: 'warning', message: '反馈失败-联系程序员' })
      }
    },
    // 举报
    async reportsFn(obj, type) {
      try {
        await removeArticle(obj.art_id, type)
        Notify({ type: 'success', message: '举报成功' })
      } catch (error) {
        Notify({ type: 'warning', message: '举报失败' })
      }
    }
  },
  async created () {
    this.getArticleList()
  }
}
</script>
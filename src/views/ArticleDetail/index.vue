<template>
  <div>
    <!-- Header 区域 -->
    <van-nav-bar fixed title="文章详情"  left-arrow @click-left="$router.back()" />
    <!-- 文章加载中... -->
    <!-- <van-loading color="#1989fa" class="loading" v-if="artObj.title === undefined">文章疯狂加载ing...</van-loading> -->
    <div>
        <!-- 文章信息区域 -->
        <div class="article-container">
          <!-- 文章标题 -->
          <h1 class="art-title">{{artObj.title}}</h1>

          <!-- 用户信息 -->
          <van-cell center :title="artObj.aut_name" :label="artObj.pubdate">
            <template #icon>
              <img :src="artObj.aut_photo" alt="" class="avatar">
            </template>
            <template #default>
              <div>
                <van-button type="info" size="mini" v-if="artObj.is_followed" @click="followedFn(false)">已关注</van-button>
                <van-button icon="plus" type="info" size="mini" plain  v-else @click="followedFn(true)"> 关注</van-button>
              </div>
            </template>
          </van-cell>

          <!-- 分割线 -->
          <van-divider></van-divider>

          <!-- 文章内容 -->
          <!-- <div class="art-content">{{artObj.content}}</div> -->
          <div class="art-content" v-html="artObj.content" v-highlight></div>

          <!-- 分割线 -->
          <van-divider>End</van-divider>

          <!-- 点赞 -->
          <div class="like-box">
            <van-button icon="good-job" type="danger" size="small" v-if="artObj.attitude === 1" @click="loveFn(false)">已点赞</van-button>
            <van-button icon="good-job-o" type="danger" plain size="small" v-else @click="loveFn(true)">点赞</van-button>
          </div>
        </div>
        <!-- 文章评论区 -->
        <CommentList></CommentList>
      </div>
    </div>
</template>

<script>
import { getArticleDetailAPI,followUserAPI, unfollowUserAPI,
  delLikeAPI, addLikeAPI
} from '@/api/index.js'
import CommentList from './CommentList.vue'
export default {
components: {
    CommentList,
},
data() {
  return {
    artObj: {}, //文章对象
    autId: '',
  }
},
async created() {
  // console.log('ArticleDetail', this.$route)
  console.log('ArticleDetail', this.$route.query.aid)
  this.autId = this.$route.query.aid
  const {data: res} = await getArticleDetailAPI( this.autId)
  // const res= await getArticleDetailAPI(this.$route.query.aid)
  console.log(res)
  this.artObj = res.data
},
methods: {
  // // 作者关注/取关
  async followedFn(bool) {
    console.log(bool)
    // 关注
    if(bool === true) {
      const { data: res } = await followUserAPI(this.autId);
      if (res.message === "OK") {
        this.$toast.success("关注成功")
        this.artObj.is_followed = bool
      }

    } else {
      const { data: res } = await unfollowUserAPI(this.autId)
      if (res.message === 204) {
        this.$toast.success("取消关注")
        this.artObj.is_followed = bool
      }
    }
   
  },
  async loveFn(bool) {
    console.log(bool)
    // 点赞
    if( bool === true ) {
      console.log(this.autId)
      const { data: res } = await delLikeAPI(this.autId)
      console.log('点赞成功', res)
      if (res.message === "OK") {
        this.$toast.success("点赞成功")
        this.artObj.attitude = 1
      }
    } else {
      console.log(this.autId)
      this.artObj.attitude = -1
      const res = await delLikeAPI(this.autId);
      console.log('取消点赞', res)
      if (res.status === 204) {
        this.$toast.success("取消点赞");
      }
    }
  }
}

}
</script>

<style scoped lang="less">
.loading {
  margin-top: 50px;
  text-align: center;
}

/deep/ .van-nav-bar__title {
  color: white 
}
/deep/ .van-icon-arrow-left:before {
    
    color: white;
}
.article-container {
  padding: 10px;
  margin-top: 46px;
}
.art-title {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
}


.art-content {
  font-size: 12px;
  line-height: 24px;
  width: 100%;
  overflow-x: scroll;
  word-break: break-all;
    /deep/ img{
    	width: 100%;
  	}
    /deep/ pre {
        white-space: pre-wrap;
        word-wrap: break-word;
    }
}

.van-cell {
  padding: 5px 0;
  &::after {
    display: none;
  }
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f8f8f8;
  margin-right: 5px;
  border: none;
}

.like-box {
  display: flex;
  justify-content: center;
}
</style>
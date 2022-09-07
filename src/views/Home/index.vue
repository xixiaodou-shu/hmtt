<template>
  <div>
    <!-- 头部标签 -->
    <van-nav-bar fixed>
      <template #left>
        <img class="logo" :src="imgObj"/>
      </template>
      <template #right>
        <van-icon name="search" size="0.48rem" color="#fff"/>
      </template>
    </van-nav-bar>

    <!-- 频道部分 点击频道v-model变量绑定对应name值, 即频道ID-->
    <van-tabs v-model="channelId" animated sticky offset-top="1.226667rem">
        <van-tab v-for="item in channelList" :key="item.id" :title="item.name">
          <!-- {{item.name}} -->
        <article-list :cid="channelId"></article-list>
        </van-tab>
    </van-tabs>
    <!-- 编辑频道图标 --> 
    <van-icon name="plus" size="0.37333334rem" class="moreChannels" @click="show = true"/>
    <!-- 弹出层组件 -->
    <van-popup v-model="show" class="edit_wrap">
      <!-- 弹出层的主体区域 -->
       <!-- close子传父自定义事件 -->
      <channel-edit :userChannelList="channelList" @close="show = false"></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import logoPng from '../../assets/toutiao_logo.png'
import { getUserChannelAPI } from '@/api/index.js'
import ArticleList from '@/views/Home/ArticleList.vue'
import ChannelEdit from './ChannelEdit.vue'
export default {
  components: {
    ArticleList,
    ChannelEdit
  },
  data() {
    return {
      imgObj: logoPng,
      active: 0,
      channelList: [],// 频道数据
      channelId: 0,
      show: false // 编辑频道弹出层显示
    }
  },
  async created() {
    const res = await getUserChannelAPI()
    console.log("频道数据", res.data.data.channels)
    this.channelList = res.data.data.channels
  }
  

}
</script>

<style>
.logo {
    width: 100px;
    height: 30px;
    /* z-index: 9999; */
}
.van-nav-bar{
   background: #007bff;
}
/* /deep/ 就是把data-v-hash值选择器写到类名的前面 */
.van-tabs__content{
    padding-top: 44px;
}
/* tab内容距离tab导航的距离 */
/deep/ .van-tabs__content{
    padding-top: 44px;
}
/deep/ .tabs-bottom-bar-color{
  color: #007bff
}
/deep/ .title-inactive-color	{
  color: #007bff
}
/deep/ title-active-color{
  color: #007bff
}
/* // 设置 tabs 容器的样式 */
/deep/ .van-tabs__wrap {
  padding-right: 30px;
  background-color: #fff;
}

/* // 设置小图标的样式 */
.moreChannels {
  position: fixed;
  top: 60px;
  right: 6px;
  z-index: 999;
}

/* 频道编辑弹出层铺满屏幕 */
.edit_wrap{
  width: 100%;
  height: 100%;
}
</style>
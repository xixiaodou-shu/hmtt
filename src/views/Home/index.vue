<template>
  <div>
    <!-- 头部标签 -->
    <van-nav-bar fixed>
      <template #left>
        <img class="logo" :src="imgObj"/>
      </template>
      <!-- 搜索 -->
      <template #right>
        <van-icon name="search" size="0.48rem" color="#fff" @click="$router.push('/search')"/>
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
    <van-popup v-model="show" class="edit_wrap" @closed="onPopupClosed">
      <!-- 弹出层的主体区域 -->
       <!-- close子传父自定义事件 -->
      <channel-edit :userChannelList="channelList" @close="show = false"
       @addChannel="addChannelFn"
       @removeChannel="removeChannelFn"
       ref="channelEdit"
       @changeChannel="changeChannelFn"
       ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import logoPng from '../../assets/toutiao_logo.png'
import { getUserChannelAPI, updataChannel } from '@/api/index.js'
import ArticleList from '@/views/Home/ArticleList.vue'
import ChannelEdit from './ChannelEdit.vue'
// import { Notify } from 'vant'

export default {
  components: {
    ArticleList,
    ChannelEdit
  },
  data() {
    return {
      imgObj: logoPng,
      active: 0,
      channelList: [],// use频道数据
      channelId: 0,
      show: false // 编辑频道弹出层显示
    }
  },
  async created() {
    const res = await getUserChannelAPI()
    console.log("频道数据", res.data.data.channels)
    this.channelList = res.data.data.channels
  },
  methods: {
    addChannelFn(obj) {
      this.channelList.push(obj)
      // this.editFn(obj,'add')
      this.updateChannel()
    },
    // 准备切换显示频道
    changeChannelFn(obj) {
      console.log('准备切换显示频道', obj)
      this.channelId = obj.id // 传过来的频道ID, 影响tabs默认v-model的选择
    },
  // 统一更新频道
  async updateChannel () {
      // 先拷贝一份数组(前端页面用channelList, 后端用拷贝出的数组)
      // 数组第一层, 对象里key+value是第二层
      const newArr = this.channelList.map(obj => {
        const newObj = { ...obj }
        return newObj
      })
      // 先剔除推荐
      const index = newArr.findIndex(obj => obj.name === '推荐')
      newArr.splice(index, 1)
      // 转换字段
      newArr.forEach((obj, index) => {
        delete obj.name
        obj.seq = index + 1
      })
      // 调用接口
      await updataChannel({
        channels: newArr
      })
    },
    // 删除频道
    async removeChannelFn(obj) {
      const ind = this.channelList.findIndex(item => item.id === obj.id)
      this.channelList.splice(ind, 1)
      this.updateChannel()
    },
    onPopupClosed() {
      // console.log(this)
      // this.show = false
      console.log('父亲操作子组件内的变量',this.$refs.channelEdit)
      this.$refs.channelEdit.isEdit = false
    },
    async editFn(obj, index, type) {
      if(type === 'add') {
        this.list.push(obj)
      }
      const arr = this.list.filter((obj) => { // // 先过滤掉id为0的推荐频道, 把剩余的数组返回
        return obj.id !== 0
      })
      console.log(arr)
      const resultList = arr.map((item,index) => {
        const newObj = {...item}
        newObj.seq = index + 1
        delete newObj.name //删除对象里面的name键值
        return newObj
      })
      // map 手机每次遍历return的值形成一个新数组
      console.log(resultList)
      await updateChannelAPI({
        channels: resultList
      })
    }
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
<template>
  <!-- 一条文章单元格 -->
<div>
  <van-cell>
    <!-- 标题区域的插槽 -->
    <template #title>
      <div class="title-box">
        <!-- 标题 -->
        <span>{{obj.title}}</span>
        <!-- 单图 -->
    	  <img class="thumb" 
            :src="obj.cover.images[0]"
            v-if="obj.cover.type === 1 " />
       </div>
      	<!-- 三张图片:src="imgUrl" 图片懒加载 -->
      <div class="thumb-box" v-if="obj.cover.type > 1">
          <img class="thumb" v-for="(imgUrl, index) in obj.cover.images"
          :key="index"
          
          v-lazy="imgUrl"
          />
  
        </div>
    </template>
    <!-- label 区域的插槽 -->
    <template #label>
      <div class="label-box">
        <div>
          <span>{{obj.aut_name}}</span>
          <span>{{obj.comm_count}}点评</span>
          <span>{{obj.pubdate}}</span>
        </div>
        <!-- 首页x, 点击也跳转详情了, 原因: 事件冒泡, 解决 -->
        <!-- 反馈按钮 x号 show控制弹不弹出-->
        <!-- 事件冒泡, 触发事件的标签会逐级向父级传递这个事件 -->
        <van-icon name="cross"  @click.stop="show = true" />
      </div>
    </template>
  </van-cell>
  <!-- 反馈面板 -->
  <van-action-sheet v-model="show" :actions="actions" @select="onSelect" get-container="body" :cancel-text="cancelText" />
</div>
  
</template>

<script>
import { firstActions, secondActions } from '@/api/report.js'
export default {
  props: {
    obj: { 
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      show: false,
      actions: firstActions,
      cancelText: '取消'
    }
  },
  methods: {
    // 反馈面板点击事件
    onSelect(action, index) {
      // console.log("反馈面板点击事件",index)
      // 二级面板
      if(action.name === '反馈垃圾内容') {
        // 证明点击的是反馈垃圾内容
        this.actions = secondActions
        this.cancelText = '返回' // 修改底部按钮显示文字
      } else if (action.name === '不感兴趣') {
        // console.log("不感兴趣") //  子传父 给ArticleList
        this.$emit('dislike', this.artId)
        this.show = false //关闭弹窗
      } else {// 这里就是二级反馈
        this.$emit('reports', this.obj, action.value) // 外面需要反馈类型的值
        this.actions = firstActions
        this.show = false
      }
        
    }
  },
  computed: {
    artId() {
      return this.obj.art_id.toString();
    },
  }
}
</script>

<style scoped lang="less">
/* 标题样式 */
.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

/* label描述样式 */
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 文章信息span */
.label-box span{
    margin: 0 3px;
    &:first-child{
        margin-left: 0;
    }
}
/* 图片的样式, 矩形黄金比例：0.618 */
.thumb {
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}

/* 三图, 图片容器 */
.thumb-box {
  display: flex;
  justify-content: space-between;
}
</style>
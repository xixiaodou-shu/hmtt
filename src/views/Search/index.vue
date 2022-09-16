<template>
  <div>
    <div class="search-header">
      <!--后退按钮-->
      <van-icon name="arrow-left" color="white" size="0.48rem" class="goback" @click="$router.back()"/>
        <!-- 搜索组件 -->
      <van-search v-fofo placeholder="请输入搜索关键词" background="#007BFF" shape="round" 
       v-model="kw"
       @input="inputFn"
       @search="enterFn"/>
    </div>
    <!-- 建议搜索 -->
    <div class="sugg-list"  v-if="kw.length != 0">
      <div class="sugg-item" v-for="(str,index) in suggestList" :key="index" 
      v-html="lightFn(str,kw)"
      @click="clickFn(str)"
      ></div>
    </div>
    <!-- 搜索历史 -->
    <div class="search-history" v-else>
      <!-- 标题 -->
      <van-cell title="搜索历史">
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #right-icon >
            <van-icon name="delete" class="search-icon" @click="clearFn" />
          </template>
      </van-cell>

      <!-- 历史列表 -->
      <div class="history-list">
          <span class="history-item" v-for="(str,index ) in history " :key="index"  @click="hisClickFn(str)">{{str}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {getSuggestListAPI} from '@/api/index.js'
import {lightFn} from '@/api/str.js'
export default {
  data() {
    return {
      kw:'', //搜索关键字
      timer: null, // 防抖，定时器用
      suggestList: [], //锦衣关键字列表
      history: ['API', 'java', 'css', '前端', '后台接口', 'python'], // 搜索历史
      // history: JSON.parse(localStorage.getItem('his')) || [] // 搜索历史
    }
  },
  watch: {
      history () {
          localStorage.setItem('his', JSON.stringify(this.history))
      }
  },
  methods: {
    lightFn, //key和value变量名同名
    // 防抖
/** 
    inputFn() {
      //  console.log(this.kw)
      clearTimeout(this.timer)
      this.timer = setTimeout(()=> {
        if(this.kw.length === 0) return 0
        console.log(this.kw)
      }, 500)
    }
 */
    async inputFn() {
      clearTimeout(this.timer) 
      this.timer = setTimeout(async() => {
        if(this.kw.length ===0 ) return 0
        const res = await getSuggestListAPI(this.kw)
        console.log(res.data)
        this.suggestList = res.data.data.options
        console.log(this.kw)
       }, 500)
    },
    enterFn() {
      console.log('enterFn', this.kw)
      this.history.push(this.kw)
      this.$router.push({
        path: `/search/${this.kw}`
      })
    },
    // 建议列表点击
    clickFn(str) {
     
      this.history.push(str)
      this.$router.push({
        path: `/search/${str}`
      })
      this.history = Array.from(new Set(this.history)) // 去重
    },
    // 历史记录点击
    hisClickFn (str) {
      this.$router.push({
        path: `/search/${str}`
      })
      this.history = Array.from(new Set(this.history)) // 去重
    },
    // 删除历史
    clearFn() {
      this.history = [] //  // watch会触发, 把空数组保存到本地
    }

  }

}
</script>

<style lang="less" scoped >
.search-header{
  height: 46px;
  display: flex;
  align-items: center;
  background-color: #007bff;
  overflow: hidden;
  /* 后退按钮 */
  .goback {
    padding-left: 14px;
  }
  /*搜索组件*/
  .van-search {
    flex: 1;
  }
}
// /*搜索建议列表样式 */
.sugg-list{
    .sugg-item {
      // 上下 0 左右15
      padding: 0 15px;
      border-bottom: 1px solid #f8f8f8;
      font-size: 14px;
      line-height: 50px;
      //实现省略号的三行代码
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
}
/**搜索历史 */
.search-icon {
  font-size: 16px;
  line-height: inherit;
}

.history-list {
  padding: 0 10px;
  .history-item {
    display: inline-block;
    font-size: 12px;
    padding: 8px 14px;
    background-color: #efefef;
    margin: 10px 8px 0px 8px;
    border-radius: 10px;
  }
}

</style>
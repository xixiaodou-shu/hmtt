# hmtt
``` 
网址：
https://gitee.com/lidongxuwork/bilibili-matching-code/blob/master/Web%E5%89%8D%E7%AB%AF/5-%E6%A1%86%E6%9E%B6/V2.x/%E9%A1%B9%E7%9B%AE/%E9%BB%91%E9%A9%AC%E5%A4%B4%E6%9D%A1_%E7%A7%BB%E5%8A%A8%E7%AB%AF%E9%A1%B9%E7%9B%AE/%E9%85%8D%E5%A5%97%E7%AC%94%E8%AE%B0/01_%E6%88%91%E7%9A%84%E7%AC%94%E8%AE%B0/Day02_%E9%A6%96%E9%A1%B5_%E6%96%87%E7%AB%A0%E5%88%97%E8%A1%A8.md
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 0906 
```
父子传值：
  自定义事件 子this.$emit('dislike',value)  父 @dislike="dislikeFn" 
  自定义属性
```
```
axios 拦截器

axios.interceptors.request.use( // 当状态码为2xx/3xx开头的进这里
  (config) => {
    // 显示 loading 效果
    Toast.loading({
      message: "加载中...",
      duration: 0
    })
    // 为请求 添加自定义字段 token 认证
    const token = store.state.tokenInfo.token
    console.log("请求拦截器token", store.state)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config;
  },
  (error) => {
    return Promise.reject(error)
  }
)
```
### 频道管理_新增频道 0907还没做
```
新增频道，删除频道做完了，
子传父自定义事件
ref this.refs.xxx.  访问子组件的data()
```
### 4.文章评论_评论点亮 没做Day05
```
1.全局指令 自动聚焦指令
utils/directives.js, 定义全局自定义指令插件
import Vue from 'vue'
// 插件对象(必须有install方法, 才可以注入到Vue.use中)
export default {
  install () {
    Vue.directive('fofo', {
      inserted (el) {
        // 指令在van-search组件身上, 获取的是组件根标签div, 而input在标签内
        el = el.querySelector('input')
        el.focus()
      }
    })
  }
}
2.在main.js 注册
import diretivesObj from '@/utils/directives'
Vue.use(diretivesObj)

3.使用的时候：
<v-fofo />
2.v-for不加key缺点
3. 正则表达式
定义高亮方法utils/str.js - 封装

/**
 * 转换高亮文字的方法
 * @param {*} str 要被处理的字符串
 * @param {*} target 要匹配关键字
 * @returns 处理后带标签高亮的方法
 */
export const lightFn = (str, target) => {
  const reg = new RegExp(target, 'ig')

  return str.replace(reg, (match) => { // match是关键字匹配的值(尽量保持原样)
    return `<span style="color: red">${match}</span>`
  })
}
4. 给组件绑定事件，用@click不行， 给组件绑定原生的点击事件@click.native (使用修饰符)
5.防抖 输入框防抖
inputFn () {
            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                if (this.kw.length === 0) return // 防止空内容触发下面逻辑
                console.log(this.kw)
            }, 500)
        }
  降低逻辑代码触发频率
  只要最后一次执行即可
  如果中间再次触发, 重新弄个计时器倒计时      
6. 问题：post 401 get就不会  
```
###  评论时候文本框弹出来，需要用到 this.$nextTick(()=>{
```
https://gitee.com/lidongxuwork/bilibili-matching-code/blob/master/Web%E5%89%8D%E7%AB%AF/5-%E6%A1%86%E6%9E%B6/V2.x/%E9%A1%B9%E7%9B%AE/%E9%BB%91%E9%A9%AC%E5%A4%B4%E6%9D%A1_%E7%A7%BB%E5%8A%A8%E7%AB%AF%E9%A1%B9%E7%9B%AE/%E9%85%8D%E5%A5%97%E7%AC%94%E8%AE%B0/01_%E6%88%91%E7%9A%84%E7%AC%94%E8%AE%B0/Day05_%E6%96%87%E7%AB%A0%E8%AF%84%E8%AE%BA_%E4%B8%AA%E4%BA%BA%E4%B8%AD%E5%BF%83.md

个人中心_编辑信息页面 401还没解决
```
### Dailog组件
```
```
### 小思,记住历史位置 401 
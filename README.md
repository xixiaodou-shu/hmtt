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

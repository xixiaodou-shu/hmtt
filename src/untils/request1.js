// 网络请求模块
import axios from "axios"
import { Toast } from "vant"
import store from "@/store/index.js"

const instance = axios.create({
  // 请求根路径
  baseURL: "http://www.liulongbin.top:8000",
})

// 请求拦截器
// 请求拦截器的作用是在请求发送前进行一些操作
// 例如:在每个请求体中加上token,统一做了处理 后要改也很简单

axios.interceptors.response.use(function (response) { 
  return response
}, async function (error) {
  if (error.response.status === 401) { // 身份过期
    // token续签方式1:
    // store.commit('setToken', '')
    // router.push({ path: '/login' })

    // token续签方式2: refreshToken(用户无感知)
    store.commit('setToken', '')
    const res = await refreshTokenAPI()
    store.commit('setToken', res.data.data.token)
    // 再调用一次未完成的请求啊(用户无感知)
    // error.config 就是上一次axios请求的配置对象
    // console.dir(error.config)
    // 把新的token赋予到下一次axios请求的请求头中
    
    error.config.headers.Authorization = 'Bearer ' + res.data.data.token
    // return到await的地方
    return ajax(error.config)
  } else {
    return Promise.reject(error)
  }
})
// 响应拦截器
// 响应拦截器的作用是在接收到响应后进行的一些操作,
// 如:在服务器返回登录状态失效,需要重新 登录的时候,跳转到登录页
instance.interceptors.response.use(
  (response) => {
    Toast.clear()
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default instance
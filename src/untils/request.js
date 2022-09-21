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

instance.interceptors.request.use(
  (config) => {
    // 显示 loading 效果
    Toast.loading({
      message: "加载中...",
      duration: 0,
    })
    // 为请求 添加自定义字段 token 认证
    const token = store.state.tokenInfo.token
    console.log("请求 添加自定义字段 token 认证",token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
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


// // import ajax from 'axios'
// // // 新建一个新的axios实例
// // const axios = ajax.create({
// //   // baseURL: 'http://123.57.109.30:8000' // 基地址
// //   baseURL: 'http://www.liulongbin.top:8000' 
// // })

// // // 导出自定义函数, 参数对象解构赋值
// // export default ({ url, method = 'GET', params, data, headers }) => {
// //   return axios({ 
// //     url: url,
// //     method: method,
// //     params: params,
// //     data: data,
// //     headers: headers
// //   })
    
// // // 以后换库, 只需要改这里, 逻辑页面不用动, 保证代码的复用性和独立性(高内聚低耦合)
// // //   return $.ajax({
// // //     url: url,
// // //     type: method,
// // //     data: data,
// // //     header: headers
// // //   })
// // }

// // 网络请求模块
// import axios from "axios";
// import { Toast } from "vant";
// import store from "@/store/index.js";

// const instance = axios.create({
//   // 请求根路径
//   baseURL: "http://www.liulongbin.top:8000"
// });

// // 请求拦截器
// // 请求拦截器的作用是在请求发送前进行一些操作
// // 例如:在每个请求体中加上token,统一做了处理 后要改也很简单;

// instance.interceptors.request.use( // 当状态码为2xx/3xx开头的进这里
//   (config) => {
//     // 显示 loading 效果
//     Toast.loading({
//       message: "加载中...",
//       duration: 0
//     })
//     // 为请求 添加自定义字段 token 认证
//     const token = store.state.tokenInfo.token;
//     console.log("请求拦截器token", token)
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
// // 响应拦截器
// // 响应拦截器的作用是在接收到响应后进行的一些操作,
// // 如:在服务器返回登录状态失效,需要重新 登录的时候,跳转到登录页;
// instance.interceptors.response.use(
//   (response) => {
//     console.log("post")
//     Toast.clear();
//     // const token1 = store.state.tokenInfo.token;
//     // if (token1) {
//     //   response.headers.Authorization = `Bearer ${token1}`;
//     // }
//     return response;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default instance;

// 接口方法, 只负责调用一个接口, 返回一个Promise对象
import request from "@/untils/request"
import store from "@/store/index.js";
// 登录
export const loginAPI = (data) => {
  return request.post("/v1_0/authorizations", data)
}

// 用户获取频道列表
export const getUserChannelAPI = () => {
  return request.get("/v1_0/user/channels");
}

// 获取文章列表数据
export const getArtListAPI = (id, time) => {
  return request.get("/v1_0/articles", {
    params: {
      channel_id: id,
      timestamp: time,
    },
  })
}

// 文章不感兴趣
export const dislikeArticleAPI = (id) => {
  return request.post("/v1_0/article/dislikes", {
    target: id,
  })
}
// 举报文章
export const removeArticle = (target, type) => {
  return request.post("/v1_0/article/reports", {
    target,
    type,
  })
}

//获取所有频道列表
export const allChannelListAPI = () => {
  return request.get('/v1_0/channels')
}

// 更新用户频道列表
export const updataChannel = (channels) => {
  return request.put("/v1_0/user/channels", {
    channels,
    // headers: {
    //   Authorization: 'Bearer ' + store.state.token
    // }
  })
}


// export const loginAPI = (data) => {
//   return request.post("/v1_0/authorizations", data)
// }
// // 用户基本信息
// export const getUserInfoAPI = () => {
//   return request.get("/v1_0/user");
// };
// // 获取用户简介信息
// export const getUserProfileAPI = () => {
//   return request.get("/v1_0/user/profile");
// };
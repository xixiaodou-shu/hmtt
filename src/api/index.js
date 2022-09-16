// 接口方法, 只负责调用一个接口, 返回一个Promise对象
import request from "@/untils/request.js"
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
// 搜索建议API
export const getSuggestListAPI = (q) => {
  return request.get("/v1_0/suggestion", {
    params: {
      q,
    }
  })
}

// 搜索结果API
export const getSearchResultAPI = (q, page=1) => {
  return request.get("/v1_0/search", {
    params: {
      q,
      page,
    },
  })
}
// 获取文章详情API
export const getArticleDetailAPI = (art_id) => {
  return request.get(`/v1_0/articles/${art_id}`)
}
// 关注作者 API
export const followUserAPI = (target) => {
  return request.post("/v1_0/user/followings", {
    target,
  })
}
// 取消关注功能
export const unfollowUserAPI = (author_id) => {
  return request.delete(`/v1_0/user/followings/${author_id}`)
}
// 文章点赞 API
export const addLikeAPI = (target) => {
  return request.post("/v1_0/article/likings", {
    target,
  })
}
// 文章点赞取消 API
export const delLikeAPI = (id) => {
  return request.delete(`/v1_0/article/likings/${id}`)
}
// 获取文章评论
export const getCmtListAPI = (source, offset) => {
  return request.get("/v1_0/comments", {
    params: {
      type: "a",
      source,
      offset,
    },
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
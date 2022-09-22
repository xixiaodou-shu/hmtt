// // 用户 - 更新token
// export const refreshTokenAPI = () => {
//   return request.put("/v1_0/authorizations")
// }
// 用户 - 更新token
export const refreshTokenAPI = () => request({
  url: '/v1_0/authorizations',
  method: 'PUT',
  headers: {
    Authorization: `Bearer ${store.state.refresh_token}`
  }
})

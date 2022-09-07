import Vue from "vue";
import Vuex from "vuex";
import { getUserInfoAPI, getUserProfileAPI } from "@/api";

Vue.use(Vuex);

// // 为请求 添加自定义字段 token 认证
// const token = store.state.tokenInfo.token;
let initState = {
  tokenInfo: {}, 
  // 用户基本信息
  userInfo: {},
  // 用户简介信息
  userProfile: {},
  token: localStorage.getItem('token') || '', 
  refresh_token: localStorage.getItem('refresh_token') || ''
  
};

// 读取 localStorage 里面的 state
const stateStr = localStorage.getItem("state");
if (stateStr) {
  initState = JSON.parse(stateStr);
}

export default new Vuex.Store({
  // 全局数据 // 存放数据
  state: initState, 
  // 包装全局数据 计算属性
  getters: {},
  // 修改全局数据 修改state数据，同步
  mutations: {
    setToken (state, token) {
      state.token = token
      console.log("Store setToken() ", state.token)
      localStorage.setItem('token', token)
    },
    setRefreshToken (state, refreshToken) {
      state.refresh_token = refreshToken
      console.log("Store setRefreshToken() ", state.refresh_token)
      localStorage.setItem('refresh_token', refreshToken)
    },

    // 更新 token
    updateTokenInfo(state, payload) {
      state.tokenInfo = payload;
      this.commit("saveStateToStorage");
    },
    // 将 state 数据 持久化存储在 localStorage
    saveStateToStorage(state) {
      localStorage.setItem("state", JSON.stringify(state));
    },
    // 更新 用户基本信息
    updataUserInfo(state, payload) {
      state.userInfo = payload;
      this.commit("saveStateToStorage");
    },
    // 退出登录 清空 state 值
    cleanState(state) {
      state.tokenInfo = {};
      state.userInfo = {};
      state.userProfile = {};
      this.commit("saveStateToStorage");
    },
    // 更新 用户简介信息
    updataUserProfile(state, payload) {
      state.userProfile = payload;
      this.commit("saveStateToStorage");
    },
  },

  // 异步修改全局数据，不能直接修改，只能通过同步修改
  actions: {
    // 初始化用户基本信息
    async initUserInfo(ctx) {
      const { data: res } = await getUserInfoAPI();
      if (res.message === "OK") {
        ctx.commit("updataUserInfo", res.data);
      }
    },
    // 初始化用户简介信息
    async initUserProfile(ctx) {
      const { data: res } = await getUserProfileAPI();
      if (res.message === "OK") {
        ctx.commit("updataUserProfile", res.data);
      }
    },
  },
});

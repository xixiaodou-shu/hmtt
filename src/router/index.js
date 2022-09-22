import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store/index.js"
// 如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效。
/* import MyLogin from '@/views/Login/MyLogin.vue'
import MyTest from '@/views/MyTest/MyTest.vue'
import MyLayout from '@/views/Layout/index.vue'
import MyHome from '@/views/Home/index.vue'
import MyUser from '@/views/User/index.vue'
import Search from '@/views/Search/index.vue'
import SearchResult from '@/views/Search/SearchResult.vue'
import ArticleDetail from '@/views/ArticleDetail/index.vue'
import UserEditor from '@/views/User/UserEdit.vue'
import Chat from '@/views/Chat/index.vue' */
const MyLogin = () => import("@/views/Login/MyLogin.vue");
const MyTest = () => import('@/views/MyTest/MyTest.vue')
const MyUser = () => import('@/views/User/index.vue')
const MyLayout = () => import('@/views/Layout/index.vue')
const MyHome = () => import('@/views/Home/index.vue')
const Search = () => import ('@/views/Search/index.vue')
const SearchResult = () => import('@/views/Search/SearchResult.vue')
const ArticleDetail = () => import('@/views/ArticleDetail/index.vue')
const UserEditor = () => import('@/views/User/UserEdit.vue')
const Chat = () => import('@/views/Chat/index.vue')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: MyLogin
  },
  {
    path: '/test',
    component: MyTest
  },
  {
    path: '/layout',
    component: MyLayout,
    redirect: '/layout/user',
    meta: { isRecord: true, top: 0 },
    // 路由离开 - 触发(保存滚动位置)
    beforeRouteLeave (to, from, next) {
      from.meta.top = window.scrollY
      next()
    },
    children: [
      { path:'home', component: MyHome },
      { path:'user', component: MyUser }
    ]
  },
  {
    path:'/search',
    component: Search
  },
  {
    // 跳转传参在路径上传递(动态路由)  /search/:
    path: '/search/:keywords',
    component: SearchResult

  },
  {
    path: '/article_detail',
    component: ArticleDetail
  },
  {
    path: '/user_editor',
    component: UserEditor
  },
  {
    path: '/chat',
    component: Chat
  }
]

const router = new VueRouter({
  routes
})
// 全局后置钩子
router.afterEach((to, from) => {
  // 如果当前的路由的元信息中，isRecord 的值为 true
  if (to.meta.isRecord) {
    setTimeout(() => {
      // 则把元信息中的 top 值设为滚动条纵向滚动的位置
      window.scrollTo(0, to.meta.top)
    }, 0)
  }
})
// router.beforeEach((to, from, next) => {
//   // 有tokenInfo, 不能去登录页
//   // 无tokenInfo, 需要用户"权限"的才需要去登录页
//   console.log('store.state.tokenInfo.length', store.state.tokenInfo.token)
//   console.log(to.path)
//   if (store.state.tokenInfo.token.length > 0 && to.path === '/login') {
  
//     // 证明有token-已经登录了
//     next(false) // 阻止跳转原地呆着
//   } else {
//     next()
//   }
// })

export default router

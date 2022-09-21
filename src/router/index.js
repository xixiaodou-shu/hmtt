import Vue from 'vue'
import VueRouter from 'vue-router'
import MyLogin from '@/views/Login/MyLogin.vue'
import MyTest from '@/views/MyTest/MyTest.vue'
import MyLayout from '@/views/Layout/index.vue'
import MyHome from '@/views/Home/index.vue'
import MyUser from '@/views/User/index.vue'
import Search from '@/views/Search/index.vue'
import SearchResult from '@/views/Search/SearchResult.vue'
import ArticleDetail from '@/views/ArticleDetail/index.vue'
import UserEditor from '@/views/User/UserEdit.vue'
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
  }
]

const router = new VueRouter({
  routes
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import MyLogin from '@/views/Login/MyLogin.vue'
import MyTest from '@/views/MyTest/MyTest.vue'
import MyLayout from '@/views/Layout/index.vue'
import MyHome from '@/views/Home/index.vue'
import MyUser from '@/views/User/index.vue'
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
    redirect: '/layout/home',
    children: [
      { path:'home', component: MyHome },
      { path:'user', component: MyUser }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router

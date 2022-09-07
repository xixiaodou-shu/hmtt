<template> 
  <div>
    <van-nav-bar title="黑马头条-登录">
    </van-nav-bar>

    <van-form @submit="onSubmit">
    <van-field
      v-model="formLogin.mobile"
      name="手机号"
      label="手机号"
      placeholder="用户名"
      :rules="[{ 
        required: true, 
        message: '请填写正确手机号',
        trigger: 'onChange',
        pattern: /^1[3456789]\d{9}$/ 
        }]"
    />
    <van-field
      v-model="formLogin.code"
      type="password"
      name="密码"
      label="密码"
      placeholder="密码"
      :rules="[{ required: true, message: '请填写密码', trigger: 'onChange', pattern: /^\d{6}$/  }]"
    />
    <div style="margin: 16px;">
      <van-button 
        round 
        block 
        type="info" 
        native-type="submit"
        :disabled="isLoading"
        >提交</van-button>
    </div>
  </van-form>
  </div>
</template>

<script>
import { loginAPI } from '@/api'
import store from '@/store'
export default {
  data() {
    return {
      formLogin: {
        mobile: '13888888123',
        code: '246810'
      },
      isLoading: false
    }
  },
  methods: {
    async onSubmit() {
      // console.log('this.formLogin', this.formLogin)
      // const { data: res } = await loginAPI(this.formLogin)
      // console.log("res:", res)
      // if (res.message === "OK") {
      //   // this.updateTokenInfo(res.data)
      //   // this.$router.push("/")
      // }
      this.isLoading = true
      try {
        // 此处data就是res.data 解构赋值
        const { data: res } = await loginAPI(this.formLogin)
        console.log("res", res) 
        const { token, refresh_token } = res.data
        // console.log(`token: ${token}, refresh_token:${refresh_token}`)
        store.commit('setToken', token)
        store.commit('setRefreshToken', refresh_token)
        // // 去出localStorage数据
        // console.log("localStorage.getItem('token')", localStorage.getItem('token'))
        this.isLoading = false

        // 跳转到Layout页面 $router下用于跳转路由 $route是路由信息对象
        this.$router.replace({
            path: '/layout'
        })
      } catch (error) {
        console.log(error)
        this.isLoading = false
      }
    }
  }

}
</script>

<style lang="less" scoped>
.van-nav-bar{
   background: #007bff;
}
/* /deep/ 就是把data-v-hash值选择器写到类名的前面 */
 /deep/ .van-nav-bar__title{
  color: white;
} 
</style>
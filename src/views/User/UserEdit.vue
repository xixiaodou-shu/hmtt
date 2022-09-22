<template>
  <div class="user-edit-container">
    <!-- Header 区域 -->
    <van-nav-bar title="编辑资料" left-arrow @click-left="$router.back()" fixed />
    <!-- 用户资料 -->
    <van-cell-group class="action-card">
      <van-cell title="头像" is-link center >
        <template #default>
          <van-image round class="avatar" :src="profile.photo" @click="$refs.iptFile.click()"/>
          <!--file选择框-->
          <input
            type="file"
            ref="iptFile"
            v-show="false"
            accept="image/*"
            @change="onFileChange"
            />
          
        </template>
      </van-cell>
      <van-cell title="名称" is-link  :value='profile.name' @click="showNameDialogFn"/>
      <!-- 修改用户名称的对话框 -->
      <van-dialog
        v-model="isShowNameDialog"
        title="修改名称"
        show-cancel-button
        :before-close="onNameDialogBeforeClose">
        <!-- 输入框  trim默认删除空格-->
        <van-field
          v-model.trim="userName"
          input-align="center"
          maxlength="7"
          placeholder="请输入名称"
          v-fofo
        />
      </van-dialog>
      <!-- 生日编辑 -->
    <van-cell title="生日" is-link  :value='profile.birthday' @click="isShowBirth = true"/>
      <!-- 修改时间 -->
      <van-popup v-model="isShowBirth" position="bottom" style="height: 50%" round>
            <!-- 日期选择控件 -->
            <van-datetime-picker
              v-model="currentDate"
              type="date"
              title="选择出生日期"
              :min-date="minDate"
              :max-date="maxDate"
              :show-toolbar="true"
              @cancel="isShowBirth = false"
			        @confirm="confirmFn"/>
      </van-popup>
    </van-cell-group>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { getUserProfileAPI, updateUserAvatarAPI, updateUserProfileAPI} from '@/api/index.js'
import { Notify } from 'vant'
import moment from 'moment'

export default {
  name: 'UserEdit',
  data() {
    return {
      profile: {},
      isShowNameDialog: false,
      userName:'', //编辑用户名
      isShowBirth: false, // 显示时间选择器
      minDate: new Date(1900, 0, 1), // 最小的可选的日期
      maxDate: new Date(), // 最大的可选日期
      currentDate: new Date() // 当前日期
    }
  },
  async created() {
    console.log('UserEdit.vue')
    // const res = await getUserProfileAPI()
    const { data: res } = await getUserProfileAPI()
    this.profile = res.data
    console.log("编辑资料res", res)
  },
  methods: {
    ...mapActions(["initUserProfile"]),
    async onFileChange(e) {
      // console.log(e.target.files[0])
      if(e.target.files.length == 0) return // 防止用户未选择图片
      const fd = new FormData()
      fd.append('photo', e.target.files[0]) // photo在表单里参数名携带
      const {data: res} = await updateUserAvatarAPI(fd)
      console.log(res)
      this.profile.photo = res.data.photo // 更新最新头像
    },
    // 点击名字-出现弹出框
    showNameDialogFn() {
      this.isShowNameDialog = true
      this.userName = this.profile.name // 设置默认显示内容
    },
    // 姓名修改弹出层-关闭前方法
    // 关闭前的回调函数，
    // 调用 done() 后关闭弹窗，
    // 调用 done(false) 阻止弹窗关闭
    async onNameDialogBeforeClose(action, done) {
      // console.log("action",action)
      // console.log("done",done)
      // 点击确定
     /* 永远不要相信用户在输入框, 输入的内容, 防止注入攻击
        1-7位中英文数字组合
      */
      // unicode编码 \u4092
      // url编码 %E2%C3%D1
      if(action == 'confirm') {
        if(/^[A-Za-z0-9\u4e00-\u9fa5]{1,7}$/.test(this.userName)){
          // 通过校验
          // 调用接口
          // 更新页面显示的名字
          // 关闭弹窗
          // 点击确认按钮
          this.updateName(done)
            // 更新页面显示的名字
          this.profile.name = this.userName
          done()
        } else {
          Notify({type: 'warning',message:'用户名中英文和数字1-7位'})
          // 阻止弹窗关闭
          done(false)
        }
      } else {
        // 取消
        done()
      }
    },
     // 更新用户名称
     async updateName(done) {
      try {
        const { data: res } = await updateUserProfileAPI({ name: this.userName });
        if (res.message === "OK") {
          done();
          // 更新用户信息 从后端数据来看
          this.initUserProfile()
          this.$notify({
            type: "success",
            message: "用户名更新成功",
            duration: 2000,
          });
        }
      } catch (e) {
        if (e.response.status === 409) {
          this.$notify({
            type: "warning",
            message: "名称被占用，请更换后重试",
            duration: 2000,
          });
          done(false);
          // this.$refs.nameRef.focus();
        } else {
          done();
          this.$notify({
            type: "danger",
            message: "名称更新失败",
            duration: 2000,
          });
        }
      }
    },
       // 弹出时间选择框
       showBirthFn () {
                this.isShowBirth = true
                this.currentDate = new Date(this.profile.birthday) // 设置data组件默认显示时间
            },
            // 时间选择
            async confirmFn () {
                // console.log(this.currentDate instanceof Date)
                // this.currentDate里值是日期对象
                // 但是后台要"年-月-日"格式字符串参数值

                console.log(this.currentDate)
                const dateStr = moment(this.currentDate).format('YYYY-MM-DD')
                await updateUserProfileAPI({
                    birthday: dateStr
                })
                // 前端页面同步
                this.profile.birthday = dateStr
                // 时间选择器关闭
                this.isShowBirth = false
            }
  }
}
</script>

<style lang="less" scoped>
.user-edit-container {
  padding-top: 46px;
  .avatar {
    width: 50px;
    height: 50px;
  }
  /deep/ .van-nav-bar__title {
  color: white;
}
}
</style>
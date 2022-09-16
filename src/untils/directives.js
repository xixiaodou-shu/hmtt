import Vue from 'vue'
// 插件对象(必须有install方法, 才可以注入到Vue.use中)
// 自动聚焦指令
export default {
  install() {
    Vue.directive('fofo', {
      inserted(el) {
      // 指令在van-search组件身上, 获取的是组件根标签div, 而input在标签内
        el = el.querySelector('input')
        // focus函数
        el.focus()
      }
    })
  }
}


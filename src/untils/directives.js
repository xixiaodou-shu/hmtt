import Vue from 'vue'
// 代码高亮插件
import hljs from 'highlight.js' // hljs对象
import 'highlight.js/styles/default.css' // 代码高亮的样式
// 插件对象(必须有install方法, 才可以注入到Vue.use中)
// 自动聚焦指令
export default {
  install() {
    Vue.directive('fofo', {
      // inserted只有第一次指令所在标签, 插入真实DOM执行
      inserted(el) {
        fn(el)
      },
      // 给自定义指令添加update方法, 指定所在DOM更新时执行
      update (el) {
        fn(el)
      }
    }),
    Vue.directive('highlight', function (el) { // 自定义一个代码高亮指令
      const highlight = el.querySelectorAll('pre, code') // 获取里面所有pre或者code标签
      highlight.forEach((block) => {
          hljs.highlightElement(block) // 突出显示这些标签(以及内部代码, 会自动识别语言)
      })
  })
  },
  
}
function fn (el) {
  if (el.nodeName === 'INPUT' || el.nodeName === 'TEXTAREA') {
    // 如果直接是input标签/textarea标签
    el.focus()
  } else {
    // 指令在van-search组件身上, 获取的是组件根标签div, 而input在标签内
    const inp = el.querySelector('input')
    const textArea = el.querySelector('textarea')
    // 如果找到了
    if (inp || textArea) {
      inp && inp.focus()
      textArea && textArea.focus()
    } else {
      // 本身也不是, 子标签里也没有
      console.error('请把v-fofo用在输入框标签上')
    }
  }
}


import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime' // 到指定时间需要的插件
import 'dayjs/locale/zh' // 集成中文

/**
 * .....多久之前
 * @param {*} 之前的时间
 * @returns 系统时间到之前指定时间的距离值
 */
// 自己写多久之前
//  relativeTime (val) {
//   const t = new Date(val)
//   const diff = Date.now() - t.getTime()

//   const year = Math.floor(diff / (1000 * 3600 * 24 * 365))
//   if (year) {
//     return `${year}年前`
//   }
//   const month = Math.floor(diff / (1000 * 3600 * 24 * 30))
//   if (month) {
//     return `${month}月前`
//   }
//   const day = Math.floor(diff / (1000 * 3600 * 24))
//   if (day) {
//     return `${day}天前`
//   }
//   const hour = Math.floor(diff / (1000 * 3600))
//   if (hour) {
//     return `${hour}小时前`
//   }
//   const minute = Math.floor(diff / (1000 * 60))
//   if (minute) {
//     return `${minute}分钟前`
//   } else {
//     return '刚才'
//   }
// }
export const timeAgo = (targetTime) => {
  // 格式化时间
  dayjs.extend(relativeTime)
  dayjs.locale('zh')
  var a = dayjs()
  var b = dayjs(targetTime)
  return a.to(b) // 返回多久之前...
}

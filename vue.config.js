const { defineConfig } = require('@vue/cli-service')
const path = require("path");
// 自定义主题的文件路径
const coverPath = path.join(__dirname, "src/cover.less");
console.log(coverPath)
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false, /*关闭语法检查*/
 css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: `true; @import "${coverPath}";`,
          },
        },
      },
    },
  },
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       // target: 'http://123.57.109.30:8000',
  //       target:'https://www.vue-js.com/api',
  //       changeOrigin: true,
  //       pathRewrite: {        // 重写路径
	// 				'^/api': ''       // 把/api变成空字符
	// 			}
  //     }
     
  //   }
  // }
})

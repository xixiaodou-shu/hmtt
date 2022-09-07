module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  // 这里自定义规则配置
  // key: 规则代码
  // value: 具体的限定方式
  //  off or 0 - 关闭规则
  //  warn or 1 - 只是警告，不会退出程序
  //  error or 2 将规则视为一个错误，报错并退出程序
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-trailing-spaces': ["off", { "skipBlankLines": true }],
    'eol-last': 'off',
    'space-before-function-paren': 'off',
    'quotes': 'off',
    'ue/multi-word-component-names': 'off',
    'no-unused-vars': 'off',
    'camelcase':'off',
    'semi': 'off',
    'comma-dangle': 'off',
    'spaced-comment': 'off',
    'no-return-assign': 'off'
  }
}

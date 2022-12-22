module.exports = {
  plugins: {
    // 配置 flexible 插件
    // 'autoprefixer': {
    //   // 兼容移动端最低版本
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },

    // postcss 插件配置
    'postcss-pxtorem': {
      // px转rem的缩放比
      rootValue: 37.5, // 37.5px转化为1rem
      propList: ['*'] // 全部文件中可转化的内容均转化
    }
  }
}

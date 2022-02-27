// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'Quick'
        return args
      })
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        win: {
          target: [
            {
              target: "nsis"
            },
            {
              target: "msi"
            },
            {
              target: "portable"
            }
          ],
          icon: 'public/favicon.ico'
        }
      }
    }
  }
}
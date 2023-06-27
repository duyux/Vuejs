const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
      // host: '0.0.0.0',
      // port: 3000,
      // client: {
      //   webSocketURL: 'ws://0.0.0.0:3000/ws',
      // },
      // headers: {
      //   'Access-Control-Allow-Origin': '*',
      // },
      // proxy: {
      //   '/onlyoffice': {
      //     target: 'http://192.168.235.133:8075/',
      //     ws:false,
      //     changeOrigin: true,
      //     pathRewrite: {
      //       '^/onlyoffice': ''
      //     }
      //   },
        // '/docservice/cache': {
        //   target: 'http://192.168.235.133:8080/onlyoffice/',
        //   ws:false,
        //   changeOrigin: true,
        //   pathRewrite: {
        //     '^/docservice/cache': ''
        //   }
        // }
     // }
      

  }
})

const path = require('path');

// module.exports = {
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, 'src/'),
//       "@@": path.resolve(__dirname, 'src/components/'),
//     }
//   }
// };

// module.exports = {
//   configureWebpack: {
//     resolve: {
//       alias: {
//         '@': path.join(__dirname, 'src/'),
//         "@@": path.join(__dirname, 'src/components/'),
//       }
//     }
//   }
// }


const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
})

module.exports = {
  devServer: {
    proxy: {
      // 프록시 설정 시 vue-router 조차 서버쪽 api를 호출 하기때문에 명시된 경로부터 시작되는 URL주소로 접근 할 때만 target URL이 호출
      '/v1':{
        "target":'http://localhost:8081', // Spring boot의 주소 및 포트
        "pathRewrite":{'^/':''},
        "changeOrigin":true,
        "ws": false,
      }
    }
  }
};

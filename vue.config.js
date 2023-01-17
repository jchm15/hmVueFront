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


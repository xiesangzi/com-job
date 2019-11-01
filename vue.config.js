const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
  runtimeCompiler: true,
  publicPath: '/', // 设置打包文件相对路径
  devServer: {
    // open: process.platform === 'darwin',
    // host: 'localhost',
    port: 8080,
    compress: true, // 开启压缩
    // open: true, //配置自动启动浏览器
    proxy: {
      '/api': {
          //target: 'http://221.13.17.16:8765', 
          target: 'http://192.168.2.13:8765', //对应自己的接口
          pathRewrite: {
            '^/api': '/api/'
          }
      }
    }
   },
   chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
    // 移除 preload 插件
    config.plugins.delete('preload');
    // 压缩代码
    config.optimization.minimize(true);
    // 分割代码
    config.optimization.splitChunks({
       chunks: 'all',
       maxInitialRequests: Infinity,
       minSize: 20000,
       cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: 2
        }
       }
    });
    //config.optimization.runtimeChunk("single");
    config.module
        .rule('images')
        .test(/\.(gif|png|jpe?g|svg)$/i)
        .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .options({
          bypassOnDebug: true
        })
        .end()
  },
  configureWebpack: config => {
     // 用cdn方式引入
     config.externals = {
        'vue': 'Vue',
        'vuex': 'Vuex',
        'vue-router': 'VueRouter',
        'view-design': 'ViewUI',
        'axios': 'axios'
     };
     config.plugins.push(
      new UglifyJsPlugin({
          uglifyOptions: {
              //生产环境自动删除console
              compress: {
                  drop_debugger: true,
                  drop_console: true,
                  pure_funcs: ['console.log']
              }
          },
          sourceMap: false,
          parallel: true,
          cache: true
      }));
  },
  productionSourceMap: false,
  // css相关配置
  css: {
      // 是否使用css分离插件 ExtractTextPlugin
      extract: true,
      // 开启 CSS source maps?
      sourceMap: false,
      // 启用 CSS modules for all css / pre-processor files.
      modules: false,
  },
}
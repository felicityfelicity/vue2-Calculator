//var -> const 避免变量提升和重复声明问题
const path = require("path");
//const webpack = require("webpack");  原配置只在生产环境使用，新配置用插件方式处理 热重载
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  //入口文件，从这里开始打包
  entry: "./src/main.js",

  //出口文件
  output: {
    //输出到dist文件夹（打包自动生成）
    path: path.resolve(__dirname, "dist"), //dirname 表示当前文件的绝对路径（根目录）
    publicPath: "/", // 公共路径：浏览器访问时的路径前缀. 配合 HtmlWebpackPlugin 自动注入，不需要 /dist/ 前缀
    //输出文件名在dist文件夹里的js文件夹到chunk.js下
    filename: "build.js", //使用由生成的内容产生的hash
    //Webpack 5 内置功能，构建前自动清理 dist 目录
    clean: true,
  },

  //模块处理
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.js$/,
        use: { loader: "babel-loader" },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["vue-style-loader", "css-loader", "sass-loader"],
      },
      {
        //新增 SCSS/SASS 规则：{ test: /\.s[ac]ss$/i, use: [...] }：支持样式预处理器，i 标志忽略大小写
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset",
        //新增 parser: { dataUrlCondition: { maxSize: 8 * 1024 } }：小于 8KB 的图片自动转为 base64 内联
        parser: { dataUrlCondition: { maxSize: 8 * 1024 } },
      },
    ],
  },

  //路径解析
  resolve: {
    //自动解析文件扩展名，避免 import 时写完整路径
    extensions: [".js", ".vue"],
    alias: {
      "@": path.resolve(__dirname, "src"),
      omponents: path.resolve(__dirname, "src/components"),
      vue$: "vue/dist/vue.esm.js",
    },
  },

  //开发服务器配置
  devServer: {
    //新增 port: 8080：明确指定端口，避免随机端口
    //新增 hot: true：启用热模块替换，提升开发体验
    //新增 open: true：自动打开浏览器，提升开发效率
    //移除 noInfo: true：Webpack 5 默认行为已优化，无需隐藏信息
    //新增 static 配置：Webpack 5 新语法，替代旧的 contentBase，更清晰

    port: 3090,
    hot: true,
    open: true,
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname),
      publicPath: "/",
    },
  },
  //插件配置
  plugins: [
    new VueLoaderPlugin(), // 必须是第一个
    //新增 HtmlWebpackPlugin：自动生成 HTML 并注入打包后的 JS，避免手动维护 <script> 标签
    // 使用现有 HTML 作为模板，保持原有结构
    // 将 JS 注入到 body 底部，符合最佳实践
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "index.html"),
      inject: "body",
    }),
  ],

  //生产环境的优化

  devtool:
    process.env.NODE_ENV === "production" ? "source-map" : "eval-source-map",
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
};

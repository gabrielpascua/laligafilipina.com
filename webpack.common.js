const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const AssetsPlugin = require("assets-webpack-plugin");
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  entry: {
    "deps": path.join(__dirname, "src", "app-dependencies.js"),
    "main": path.join(__dirname, "src", "main.js"),
    "vue3": path.join(__dirname, "src", "app-vue.js")
  },

  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "",
  },

  module: {
    rules: [
      {
        test: /\.((png)|(eot)|(woff)|(woff2)|(ttf)|(svg)|(gif))(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader",
        options: {
          name: "name=/[hash].[ext]",
        },
      },

      {
        test: /\.json$/,
        loader: "json-loader"
      },

      {
        test: /\.vue$/,
        loader: "vue-loader"
      },

      {
        loader: "babel-loader",
        test: /\.js?$/,
        exclude: /node_modules/,
        options: { cacheDirectory: true },
      },

      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false
            }
          },
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },

  resolve: {
    alias: {
      "vue$": "vue/dist/vue.esm-bundler.js"
    },
    extensions: ["*", ".js", ".vue", ".json"]
  },

  plugins: [
    new AssetsPlugin({
      filename: "webpack.json",
      path: path.join(process.cwd(), "site/data"),
      prettyPrint: true,
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./src/fonts/",
          to: "fonts/",
        },
      ],
    }),

    new VueLoaderPlugin(),

    new webpack.DefinePlugin({
      __VUE_PROD_DEVTOOLS__: 'false'
    })
  ],
};

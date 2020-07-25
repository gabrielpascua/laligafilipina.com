const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const AssetsPlugin = require("assets-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  entry: {
    main: path.join(__dirname, "src", "index.js"),
    app: path.join(__dirname, "src", "app.js")
  },

  output: {
    path: path.join(__dirname, "dist")
  },

  module: {
    rules: [
      {
        test: /\.((png)|(eot)|(woff)|(woff2)|(ttf)|(svg)|(gif))(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader?name=/[hash].[ext]"
      },

      {test: /\.json$/, loader: "json-loader"},

      {
        test: /\.vue$/,
        loader: "vue-loader"
      },

      {
        loader: "babel-loader",
        test: /\.js?$/,
        exclude: /node_modules/,
        query: {cacheDirectory: true}
      },

      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]
      }
    ]
  },

  resolve: {
    alias: {
      "vue$": "vue/dist/vue.esm.js"
    },
    extensions: ["*", ".js", ".vue", ".json"]
  },

  plugins: [
    new webpack.ProvidePlugin({
      fetch: "imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch"
    }),

    new AssetsPlugin({
      filename: "webpack.json",
      path: path.join(process.cwd(), "site/data"),
      prettyPrint: true
    }),

    new CopyPlugin({
      patterns: [{
        from: "src/fonts/",
        to: "fonts/",
        flatten: true
      }],
    }),

    new VueLoaderPlugin(),
  ]
};

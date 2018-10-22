const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader",
              options: { minimize: true }
            }
          ]
        },
        {
            test: /\.scss$/,
            use: [
              {
                loader: "style-loader" // creates style nodes from JS strings
              },
              {
                loader: "css-loader" // translates CSS into CommonJS
              },
              {
                loader: "sass-loader" // compiles Sass to CSS
              }
            ]
          },
          {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                'file-loader'
            ]
          }
      ]
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html"
      })
    ]
  };
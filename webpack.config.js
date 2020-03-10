const path = require("path");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const env = process.env.NODE_ENV;

const config = {
  devtool: env == "development" && "source-map",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/js")
    }
  },
  // extensions: ['.js', '.css'],
  entry: path.resolve(__dirname, "src/index.js"),
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: env == "development"
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: env == "development",
              config: {
                path: "postcss.config.js",
                ctx: {
                  env
                }
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
      filename: "index.html"
    })
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    library: "APP",
    libraryTarget: "umd",
    filename: "bundle.js"
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      name: "libs"
    }
  }
};

module.exports =
  env == "development"
    ? merge(config, {
        mode: "development",
        devServer: {
          hot: true,
          open: true
        }
      })
    : merge(config, {
        mode: "production",
        plugins: [new CleanWebpackPlugin({})],
        optimization: {
          minimize: true,
          minimizer: [new TerserWebpackPlugin()]
        }
      });

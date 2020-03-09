const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
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
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html"
    })
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    library: "APP",
    libraryTarget: "umd",
    filename: "bundle.js"
  }
};

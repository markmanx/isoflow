const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  devtool: "eval-cheap-source-map",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "build"),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "build"),
    },
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, "../src/index.html"),
    }),
  ],
};

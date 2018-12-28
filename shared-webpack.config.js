const path = require("path");
const webpack = require("webpack");
const ExecutableDllPlugin = require('executable-dll-plugin');


module.exports = {
  // mode: "development" || "production",
  name: "vendor",
  resolve: {
    extensions: [".js", ".jsx"]
  },
  entry: {
    environment: ["babel-polyfill", "./utility2"],
    "vendor-react": ["react", "react-dom"],
    "vendor-jquery": ["jquery", "./expose-jquery"]
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
    library: "[name]_[hash]"
    //library: "[name]"
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, "dist", "[name]-manifest.json"),
      name: "[name]_[hash]"
      //name: "[name]"
    }),
    //new ExecutableDllPlugin()
  ]
};

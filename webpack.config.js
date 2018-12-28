const path = require("path");
const webpack = require("webpack");
const ExecutableDllPlugin = require('executable-dll-plugin');


module.exports = [
  {
    name: "environment",
    // mode: "development || "production",
    entry: ["babel-polyfill", "./utility2"],
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "environment.js",
      library: "environment_[hash]"
    },
    plugins: [
      new webpack.DllPlugin({
        name: "environment_[hash]",
        path: path.resolve(__dirname, "dist/environment-manifest.json")
      }),
      new ExecutableDllPlugin()
    ]
  },
  {
    name: "vendor_react",
    // mode: "development || "production",
    entry: ["react", "react-dom"],
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "vendor-react.js",
      library: "vendor_react_[hash]"
    },
    plugins: [
      new webpack.DllPlugin({
        name: "vendor_react_[hash]",
        path: path.resolve(__dirname, "dist/vendor-react-manifest.json")
      })
    ]
  },
  {
    name: "vendor_jquery",
    // mode: "development || "production",
    entry: ["jquery", "./expose-jquery"],
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "vendor-jquery.js",
      library: "vendor_jquery_[hash]"
    },
    plugins: [
      new webpack.DllPlugin({
        name: "vendor_jquery_[hash]",
        path: path.resolve(__dirname, "dist/vendor-jquery-manifest.json")
      }),
      new ExecutableDllPlugin()
    ]
  },

  {
    name: "app",
    // mode: "development || "production",
    dependencies: ["environment", "vendor_react", "vendor_jquery"],
    entry: {
      pageA: "./pageA",
      pageB: "./pageB",
      pageC: "./pageC"
    },
    output: {
      path: path.join(__dirname, "dist"),
      filename: "[name].js"
    },
    optimization: {
      runtimeChunk: {
        name: 'webpack-runtime'
      }
    },
    plugins: [
      new webpack.DllReferencePlugin({
        manifest: path.resolve(__dirname, "dist/environment-manifest.json")
      }),
      new webpack.DllReferencePlugin({
        manifest: path.resolve(__dirname, "dist/vendor-react-manifest.json")
      }),
      new webpack.DllReferencePlugin({
        manifest: path.resolve(__dirname, "dist/vendor-jquery-manifest.json")
      }),
    ]
  }
];

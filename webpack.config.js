const path = require("path");
const webpack = require("webpack");
const ExecutableDllPlugin = require("executable-dll-plugin");

const sharedEntries = [
  {
    name: "environment",
    entry: ["babel-polyfill", "./utility2"],
    shouldExecute: true,
    manifestPath: path.resolve(__dirname, "dist/environment_manifest.json")
  },
  {
    name: "vendor_react",
    entry: ["react", "react-dom"],
    shouldExecute: false,
    manifestPath: path.resolve(__dirname, "dist/vendor_react_manifest.json")
  },
  {
    name: "vendor_jquery",
    entry: ["jquery", "./expose-jquery"],
    shouldExecute: true,
    manifestPath: path.resolve(__dirname, "dist/vendor_jquery_manifest.json")
  }
];

module.exports = [
  ...sharedEntries.map(({ name, entry, shouldExecute, manifestPath }) => {
    const windowGlobalName = `__${name}`;
    return {
      name,
      entry,
      output: {
        path: path.resolve(__dirname, "dist"),
        filename: `${name}.js`,
        library: windowGlobalName
      },
      plugins: [
        new webpack.DllPlugin({ name: windowGlobalName, path: manifestPath }),
        shouldExecute && new ExecutableDllPlugin()
      ].filter(Boolean)
    };
  }),
  {
    name: "app",
    devtool: false,
    dependencies: [...sharedEntries.map(e => e.name)],
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
      minimize: false,
      runtimeChunk: {
        name: "webpack-runtime"
      }
    },
    plugins: [
      ...sharedEntries.map(({ manifestPath }) => {
        return new webpack.DllReferencePlugin({ manifest: manifestPath });
      })
    ]
  }
];

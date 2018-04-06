var path = require("path");

module.exports = {
	// mode: "development" || "production",
	entry: {
    environment: ["babel-polyfill", "./utility2"],
    "vendor-react": ["react", "react-dom"],
    "vendor-jquery": ["jquery", "./expose-jquery"],
		pageA: "./pageA",
		pageB: "./pageB",
		pageC: "./pageC"
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
        default: false,
        vendors: false,
				environment: {
					test: "environment",
					chunks: "all",
					name: "environment",
					enforce: true
				},
				"vendor-react": {
					test: "vendor-react",
					chunks: "all",
					name: "vendor-react",
					enforce: true
				},
				"vendor-jquery": {
					test: "vendor-jquery",
					chunks: "all",
					name: "vendor-jquery",
					enforce: true
				}
			}
		}
	},
	output: {
		path: path.join(__dirname, "dist"),
		filename: "[name].js"
	}
};

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");
const path = require("path");

module.exports = {
	entry: "./src/index",
	mode: "development",
	devServer: {
		static: path.join(__dirname, "dist"),
		port: 3000,
	},
	output: {
		publicPath: "auto",
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loader: "babel-loader",
				exclude: /node_modules/,
				options: {
					presets: ["@babel/preset-react"],
				},
			},
			{
				test: /\.(css)$/,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: { sourceMap: true, importLoaders: 1, modules: false },
					},
				],
			},
		],
	},
	plugins: [
		new ModuleFederationPlugin({
			name: "webpackFederation",
			remotes: {
				todo: "todo@http://localhost:3001/remoteEntry.js",
				signup: "signup@http://localhost:3002/remoteEntry.js",
			},
			shared: { react: { singleton: true }, "react-dom": { singleton: true } },
		}),
		new ExternalTemplateRemotesPlugin(),
		new HtmlWebpackPlugin({
			template: "./public/index.html",
		}),
	],
};

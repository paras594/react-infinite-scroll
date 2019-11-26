const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: path.resolve(__dirname, "src"),
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "bundle.js",
		chunkFilename: "[name].js",
	},
	optimization: {
		splitChunks: {
			chunks: "all",
			minChunks: 2,
		},
	},
	devtool: "source-map",
	devServer: {
		port: 3000,
		contentBase: path.resolve(__dirname, "build"),
		watchContentBase: true,
		// proxy: {
		// 	"/": {
		// 		target: "http://localhost:5000",
		// 	},
		// }
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
	},
	module: {
		rules: [
			{
				// Include js, and jsx files.
				test: /\.(js)x?$/,
				exclude: /node_modules/,
				loader: "babel-loader",
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: "html-loader",
					},
				],
			},
			{
				test: /\.s?[ac]ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							sourceMap: true,
						},
					},
					{
						loader: "postcss-loader",
					},
					{
						loader: "resolve-url-loader",
					},
					{
						loader: "sass-loader",
						options: {
							sourceMap: true,
						},
					},
				],
			},
			{
				test: /\.(png|jp(e*)g|svg|gif)$/,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 8000, // Convert images < 8kb to base64 strings
							name: "images/[name].[ext]",
						},
					},
				],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "style.css",
		}),
		new HtmlWebPackPlugin({
			template: "./src/index.html",
			filename: "./index.html",
		}),
	],
};

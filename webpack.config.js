const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const paths = {
	DIST: path.resolve(__dirname, 'dist'),
	SRC: path.resolve(__dirname, 'src'),
	JS: path.resolve(__dirname, 'src/js')
}

//Webpack configuration
module.exports = {
	entry: path.join(paths.JS, 'app.js'),
	output: {
		path: paths.DIST,
		filename: 'app.bundle.js'
	},

	//webpack use plugin...
	//HtmlWebpackPlugin use index.html as template
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(paths.SRC, 'index.html')
		}),
		new ExtractTextPlugin('style-bundle.css')
	],

	//Loaders configuration
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: [
					'babel-loader'
				]
			},
			//CSS loader
			// Files will get handled by css loader and then passed to the extract text plugin
			// which will write it to the file we defined above
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract({
					use: 'css-loader'
				})
			},
			//Image loader
			{
				test: /\.(png|jpg|gif|svg)$/,
				use: [
					'file-loader'
				]
			}
		]
	},

	//imporitng without extension
	resolve: {
		extensions: ['.js', '.jsx']
	}
	//starting point for devServer
	/* devServer: {
		contentBase: paths.SRC
	} */
}
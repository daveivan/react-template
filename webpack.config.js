const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const glob = require('glob');

const paths = {
	DIST: path.resolve(__dirname, 'dist'),
	SRC: path.resolve(__dirname, 'src'),
	APP: path.resolve(__dirname, 'src/app')
}

//Webpack configuration
module.exports = {
	entry: [
		path.join(paths.APP, 'app.js'),
		...glob.sync(path.join(paths.SRC, 'scss/*.scss')),
		...glob.sync(path.join(paths.APP, '**/*.scss')),
	],
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
				test: /\.(scss)$/,
				loader: ExtractTextPlugin.extract({
					fallback: 'style-loader', 
					use: 'css-loader!sass-loader'
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
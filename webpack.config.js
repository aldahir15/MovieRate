const path = require('path');

module.exports = {
  context: __dirname,
  entry: './frontend/movieRating.jsx',
  output: {
    path: path.resolve(__dirname, 'app', 'assets', 'javascripts'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [

      { test: /\.css$/, loader: "style-loader!css-loader" },

      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx", "*",".css"]
  }
};
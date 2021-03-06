const path = require('path');
 
module.exports = {
  context: path.join(__dirname, './src'),
  entry: [
    './main.js',
  ],
  output: {
    path: path.join(__dirname, './www'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx|\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }, {
            loader: "sass-loader" // compiles Sass to CSS
        }]
      },
      {
          test: /\.(jpg|png|svg)$/,
          loader: 'url-loader',
          options: {
              limit: 25000,
          },
      },
    ],
  },
  resolve: {
    modules: [
      path.join(__dirname, 'node_modules'),
    ],
  },
};
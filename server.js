const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const app = express();
const http = require('http')
 
app.set('port', (process.env.PORT || 5000));

const compiler = webpack(webpackConfig);
 
app.use(express.static(__dirname + '/www'));
 
app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));
 
const server = app.use('/api', function (req, res, next){
  next()
}).listen(app.get('port'), function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
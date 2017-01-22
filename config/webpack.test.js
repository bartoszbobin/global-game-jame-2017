/**
 * @see https://github.com/AngularClass/angular2-webpack-starter
 */

var helpers = require('./helpers');

// Webpack Plugins
var ProvidePlugin = require('webpack/lib/ProvidePlugin');
var DefinePlugin  = require('webpack/lib/DefinePlugin');

var ENV = process.env.ENV = process.env.NODE_ENV = 'test';

var package = require('../package');

/**
 * Webpack Constants
 */
const METADATA = {
  title: package.name,
  version: package.version,
  baseUrl: '/'
};

/*
 * Config
 */
module.exports = {
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['', '.ts', '.js', '.json']
  },

  module: {
   preLoaders: [
      {
        test: /\.ts$/,
        loader: 'tslint-loader',
        exclude: [
          helpers.root('node_modules')
        ]
      },
      {
        test: /\.js$/,
        loader: "source-map-loader",
        exclude: [
          helpers.root('node_modules')
        ]
      }
    ],
    loaders: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        //loader: 'ts-loader',
        query: {
          'compilerOptions': {
            'removeComments': true
          }
        },
        exclude: [ /\.e2e\.ts$/, helpers.root('node_modules'), helpers.root('src/typings') ]
      },
      { test: /\.json$/, loader: 'json-loader', exclude: [ helpers.root('src/index.html'), helpers.root('node_modules') ] },
      { test: /\.html$/, loader: 'html-loader', exclude: [ helpers.root('src/index.html'), helpers.root('node_modules') ] },
      { test: /\.css$/,  loader: 'style!css',  exclude: [ helpers.root('src/index.html'), helpers.root('node_modules') ] }
    ],
    postLoaders: [
      // instrument only testing sources with Istanbul
      {
        test: /\.(js|ts)$/,
        include: helpers.root('src'),
        loader: 'istanbul-instrumenter-loader',
        exclude: [
          /\.(e2e|spec)\.ts$/,
          /node_modules/
        ]
      }
    ]
  },
  plugins: [
    new DefinePlugin({
     'VERSION' : JSON.stringify(METADATA.version),
     'APP_NAME' : JSON.stringify(METADATA.title),
      // Environment helpers
      'process.env': {
        'ENV': JSON.stringify(ENV),
        'NODE_ENV': JSON.stringify(ENV)
      }
  })
  ],
    // we need this due to problems with es6-shim
  node: {
    fs: 'empty', //for pixi errors
    global: 'window',
    progress: false,
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  },
  tslint: {
    emitErrors: false,
    failOnHint: false,
    resourcePath: 'src'
  }
};

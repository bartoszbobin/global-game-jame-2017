/**
 * @author: @AngularClass
 */

var webpack = require('webpack');
var helpers = require('./helpers');

/**
 * Webpack Plugins
 */
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;


var package = require('../package');

/**
 * Webpack Constants
 */
const METADATA = {
  title: package.name,
  version: package.version
};



/**
 * Phaser webpack config
 * loading phaser from node_modules
 * See: https://github.com/photonstorm/phaser/issues/1974
 */
var phaser = helpers.root('node_modules/phaser/build/custom/phaser-split.js');
var pixi = helpers.root('node_modules/phaser/build/custom/pixi.js');
var p2 = helpers.root('node_modules/phaser/build/custom/p2.js');

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = {

  // Static metadata for index.html
  //
  // See: (custom attribute)
  metadata: METADATA,

  // Cache generated modules and chunks to improve performance for multiple incremental builds.
  // This is enabled by default in watch mode.
  // You can pass false to disable it.
  //
  // See: http://webpack.github.io/docs/configuration.html#cache
  // cache: false,

  // The entry point for the bundle
  //
  // See: http://webpack.github.io/docs/configuration.html#entry
    entry: {
    'index': './src/index.ts' // our app
  },

  // files that are external and available
  // on the global var
  externals: {
  },

  // Options affecting the resolving of modules.
  //
  // See: http://webpack.github.io/docs/configuration.html#resolve
  resolve: {

    // An array of extensions that should be used to resolve modules.
    //
    // See: http://webpack.github.io/docs/configuration.html#resolve-extensions
    extensions: ['','.ts','.js','.json','.css','.html'],

    // Make sure root is src
    root: helpers.root('src'),

    // remove other default values
    modulesDirectories: ['node_modules'],

    //target specific libraries instead of the default ones
    alias: {

      /**
       * loading phaser from node_modules
       * See: https://github.com/photonstorm/phaser/issues/1974
       */
      'phaser': phaser,
      'pixi': pixi,
      'p2': p2,
    }

  },

  // Options affecting the normal modules.
  //
  // See: http://webpack.github.io/docs/configuration.html#module
  module: {

    // An array of applied pre and post loaders.
    //
    // See: http://webpack.github.io/docs/configuration.html#module-preloaders-module-postloaders
    preLoaders: [

      // Tslint loader support for *.ts files
      //
      // See: https://github.com/wbuchwalter/tslint-loader
      {
        test: /\.ts$/,
        loader: 'tslint-loader',
        exclude: [
          helpers.root('node_modules'),
          helpers.root('typings')
        ]
      },

      // Source map loader support for *.js files
      // Extracts SourceMaps for source files that as added as sourceMappingURL comment.
      //
      // See: https://github.com/webpack/source-map-loader
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [          
          helpers.root('node_modules/phaser'),
        ]
      }
    ],

    // An array of automatically applied loaders.
    //
    // IMPORTANT: The loaders here are resolved relative to the resource which they are applied to.
    // This means they are not resolved relative to the configuration file.
    //
    // See: http://webpack.github.io/docs/configuration.html#module-loaders
    loaders: [

      /**
       * loading phaser from node_modules
       * See: https://github.com/photonstorm/phaser/issues/1974
       */
      { test: /pixi\.js/, loader: 'expose?PIXI' },
      { test: /phaser-split\.js$/, loader: 'expose?Phaser' },
      { test: /p2\.js/, loader: 'expose?p2' },


      // Typescript loader support
      //
      // See: https://github.com/s-panferov/awesome-typescript-loader
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        //loader: 'ts-loader',
        exclude: [
         /\.(spec|e2e)\.ts$/,
         helpers.root('node_modules')
        ]
      },

      // Json loader support for *.json files.
      //
      // See: https://github.com/webpack/json-loader
      {
        test: /\.json$/,
        loader: 'json-loader'
      },

      // support for *.css files
      //{
      //  test: /\.css$/,
     //   loader: 'style!css',
     // },

      // loader support for *.html
      // Returns file content as string
     // {
     //   test: /\.html$/,
     //   loader: 'html-loader',
     //   exclude: [helpers.root('src/index.html')]
     // },
    ]
  },

  // Add additional plugins to the compiler.
  //
  // See: http://webpack.github.io/docs/configuration.html#plugins
  plugins: [

    // Plugin: ForkCheckerPlugin
    // Description: Do type checking in a separate process, so webpack don't need to wait.
    //
    // See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
   // new ForkCheckerPlugin(),

    // Plugin: OccurenceOrderPlugin
    // Description: Varies the distribution of the ids to get the smallest id length
    // for often used ids.
    //
    // See: https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
    // See: https://github.com/webpack/docs/wiki/optimization#minimize
    new webpack.optimize.OccurenceOrderPlugin(true),

    // Plugin: CommonsChunkPlugin
    // Description: Shares common code between the pages.
    // It identifies common modules and put them into a commons chunk.
    //
    // See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
    // See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
    //new webpack.optimize.CommonsChunkPlugin({
    //  name: helpers.reverse(['polyfills', 'vendor', 'main']),
    //  minChunks: Infinity
    //}),

    // Plugin: CopyWebpackPlugin
    // Description: Copy files and directories in webpack.
    //
    // Copies project static assets.
    //
    // See: https://www.npmjs.com/package/copy-webpack-plugin
    new CopyWebpackPlugin([
    {
      from: 'src/assets',
      to: 'assets'
    }
    ]),

    // Plugin: HtmlWebpackPlugin
    // Description: Simplifies creation of HTML files to serve your webpack bundles.
    // This is especially useful for webpack bundles that include a hash in the filename
    // which changes every compilation.
    //
    // See: https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      chunksSortMode: 'none'
    })
  ],

  // Static analysis linter for TypeScript advanced options configuration
  // Description: An extensible linter for the TypeScript language.
  //
  // See: https://github.com/wbuchwalter/tslint-loader
  tslint: {
    emitErrors: false,
    failOnHint: false,
    resourcePath: 'src'
  },

  // Include polyfills or mocks for various node stuff
  // Description: Node configuration
  //
  // See: https://webpack.github.io/docs/configuration.html#node
  node: {
    global: 'window',
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  },
};

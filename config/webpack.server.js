const webpack = require('webpack');
const path = require('path');
const helpers = require('./helpers');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const METADATA = {
  ENV: ENV,
  title: 'Todo in Angular',
  baseUrl: '/'
};

module.exports = {
  target: 'node',
  externals: [helpers.checkNodeImport, /bookshelf|knex/],
  context: helpers.root(''),
  metadata: METADATA, // Static metadata for index.html

  entry: {
    server: path.join(`${__dirname}/..`, 'server', 'server.ts'),
  },

  resolve: {
    extensions: ['', '.ts', '.js'],
    // Make sure root is src
    root: helpers.root('src'),
    // remove other default values
    modulesDirectories: ['node_modules'],
    alias: {
      'angular2/core': helpers.root('node_modules/@angular/core/index.js'),
      'angular2/testing': helpers.root('node_modules/@angular/core/testing.js'),
      '@angular/testing': helpers.root('node_modules/@angular/core/testing.js'),
      'angular2/platform/browser': helpers.root('node_modules/@angular/platform-browser/index.js'),
      'angular2/router': helpers.root('node_modules/@angular/router-deprecated/index.js'),
      'angular2/http': helpers.root('node_modules/@angular/http/index.js'),
      'angular2/http/testing': helpers.root('node_modules/@angular/http/testing.js')
    },
  },
  
  // Options affecting the normal modules.
  module: {
   noParse: [
      helpers.root('zone.js', 'dist'),
      helpers.root('angular2', 'bundles')
    ],
    
    preLoaders: [
      // Tslint loader support for *.ts files
      // { test: /\.ts$/, loader: 'tslint-loader', exclude: [ helpers.root('node_modules') ] },
      // Source map loader support for *.js files
      // Extracts SourceMaps for source files that as added as sourceMappingURL comment.
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          // these packages have problems with their sourcemaps
          helpers.root('node_modules/rxjs'),
          helpers.root('node_modules/contentful'),
          helpers.root('node_modules/@angular2-material'),
          helpers.root('node_modules/@angular'),
        ]
      }
    ],

    // The loaders here are resolved relative to the resource which they are applied to.
    // This means they are not resolved relative to the configuration file.
    loaders: [
        // Typescript loader support for .ts and Angular 2 async routes via .async.ts
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader']
      },
      { 
        test: /angular2-material/,
        loader: "imports-loader?window=>global"
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.css$/,
        exclude: helpers.root('src', 'app'),
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
      },
      {
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        loader: 'raw'
      }
    ]
  },

  output: {
    path: helpers.root('dist/'),
    libraryTarget: 'commonjs2',
    // Specifies the name of each output file on disk.
    // Note: do not specify an absolute path here
    filename: 'server.js',
    // The filename of the SourceMaps for the JS files inside the output.path directory.
    sourceMapFilename: 'server.map',
    // The filename of non-entry chunks as relative path inside the output.path directory.
    chunkFilename: '[id].chunk.js'
  },

  plugins: [
    // Do type checking in a separate process, so webpack don't need to wait.
    new ForkCheckerPlugin(),
    // Varies the distribution of the ids to get the smallest id length for often used ids.
    new webpack.optimize.OccurenceOrderPlugin(true),
    new ExtractTextPlugin('[name].css'),
  ],

  node: {
    global: true,
    __dirname: true,
    __filename: true,
    process: true, 
    Buffer: true
  }
};


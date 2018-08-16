const {
  resolve
} = require('path');
const { cpus } = require('os');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HappyPack = require('happypack');
const Webpack = require('webpack');


const isDevelopment = process.env.NODE_ENV === 'development';

const styleLoaders = [{
    loader: 'style-loader',
  },
  {
    loader: 'css-loader',
    options: {
      sourceMap: true,
      alias: {
        assets: resolve('./src/assets'),
      },
    },
  },
  {
    loader: 'less-loader',
    options: {
      sourceMap: true,
      paths: 'src',
    },
  },
];

const happyThreadPool = HappyPack.ThreadPool({ size: cpus().length });


module.exports = {
  entry: {
    main: './src/index'
  },
  output: {
    filename: '[name].bundle.js',
    sourceMapFilename: '[file].map'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    // modules: [
    //   'node-modules'
    // ],
    alias: {
      src: resolve('./../src')
    }
  },
  devtool: isDevelopment ? 'cheap-module-eval-source-map' : false,
  mode: isDevelopment ? 'development' : 'production',
  performance: {
    hints: false
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['happypack/loader?id=babel'],
      },
      {
        test: /\.(css|less)$/,
        use: styleLoaders
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            name: 'img/[name].[ext]',
            limit: 8192,
            fallback: 'file-loader',
          },
        }],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{
          loader: 'url-loader',
          options: {
            name: 'font/[name].[ext]',
            fallback: 'file-loader',
          },
        }],
      },
    ]
  },
  optimization: {
    runtimeChunk: {
      name: 'vendor',
    },
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'vendor',
          chunks: 'initial',
          minChunks: 2,
        },
      },
    },
  },
  context: resolve(__dirname,'./..'),
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, './../index.html'),
      inject: true
    }),
    new HappyPack({
      id: 'babel',
      threadPool: happyThreadPool,
      loaders: ['babel-loader?cacheDirectory'],
    }),
    new Webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    hot: true,
    noInfo: true,
    open: isDevelopment,
    host: '0.0.0.0',
    useLocalIp: true,
    port: 3000,
    historyApiFallback: {
      rewrites: [
        // { from: /^\/$/, to: '/index.html' },
        {
          from: /./,
          to: '/index.html'
        },
      ],
    },
  },
}
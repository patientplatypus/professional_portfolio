// https://github.com/diegohaz/arc/wiki/Webpack
const path = require('path')
require("babel-core/register");
require("babel-polyfill");
const Dotenv = require('dotenv-webpack');
// require('velocity-animate');
// require('velocity-animate/velocity.ui');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const devServer = require('@webpack-blocks/dev-server2')
const splitVendor = require('webpack-blocks-split-vendor')
const happypack = require('webpack-blocks-happypack')

const {
  addPlugins, createConfig, entryPoint, env, setOutput,
  sourceMaps, defineConstants, webpack,
} = require('@webpack-blocks/webpack2')

const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 3000
const sourceDir = process.env.SOURCE || 'src'
const publicPath = `/${process.env.PUBLIC_PATH || ''}/`.replace('//', '/')
const sourcePath = path.join(process.cwd(), sourceDir)
const outputPath = path.join(process.cwd(), 'dist')

const babel = () => () => ({
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
    ],
  },
})

const assets = () => () => ({
  module: {
    rules: [
      { test: /\.(png|mov|m4v|jpe?g|svg|pdf|woff2?|gif|ttf|eot)$/, loader: 'url-loader?limit=8000' },
    ],
  },
})

//platypus added
const flex = () => () => ({
  module: {
    rules: [
      // {  test: /\.css$/, loader: 'style-loader!css-loader', include: /flexboxgrid/ },
      // { test: /\.css$/, loader: "style-loader!css-loader" },
      // /(\.css)$/
      {test: /(\.css)$/, loader: ['style-loader', 'css-loader?modules'], include: /flexboxgrid/},
    ],
  },
})

//platypus added
const fixcss = () => () => ({
  module: {
      rules: [
        {
          test: /\.css$/,
          use: [ 'style-loader', 'css-loader' ]
        }
      ]
    }
})


//need to use the following to get lodash to work for velocity-react
//according to internet https://github.com/webpack/webpack/issues/4030
// resolve: {
//         modules: [
//             "node_modules",
//         ],
//         extensions: [".js", ".jsx"],
//     },


//however that clearly won't work with my configuration
const resolveModules = modules => () => ({
  resolve: {
    modules: [].concat(modules, ['node_modules']),
  },
})

const config = createConfig([
  entryPoint({
    app: sourcePath,
  }),
  setOutput({
    filename: '[name].js',
    path: outputPath,
    publicPath,
  }),
  defineConstants({
    'process.env.NODE_ENV': process.env.NODE_ENV,
    'process.env.PUBLIC_PATH': publicPath.replace(/\/$/, ''),
    'process.env.alphavantagekey': 'OAO5GXY4IMRLFLII',
  }),
  defineConstants({
    'process.env.newsapikey': 'e9831e28210946afb679f014ed18e5c7',
  }),
  addPlugins([
    new Dotenv({
     path: './.env', // Path to .env file (this is the default)
     safe: true // load .env.example (defaults to "false" which does not use dotenv-safe)
    }),
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(process.cwd(), 'public/index.html'),
    }),
  ]),
  happypack([
    babel(),
  ]),
  assets(),
  flex(), //platypus added
  fixcss(), //platypus added
  // tousestaticcss(), //platypus added
  resolveModules(sourceDir),

  env('development', [
    devServer({
      contentBase: 'public',
      stats: 'errors-only',
      historyApiFallback: { index: publicPath },
      headers: { 'Access-Control-Allow-Origin': '*' },
      host,
      port,
    }),
    sourceMaps(),
    addPlugins([
      new Dotenv({
       path: './.env', // Path to .env file (this is the default)
       safe: true // load .env.example (defaults to "false" which does not use dotenv-safe)
      }),
      new webpack.NamedModulesPlugin(),
    ]),
  ]),

  env('production', [
    splitVendor(),
    addPlugins([
      new Dotenv({
       path: './.env', // Path to .env file (this is the default)
       safe: true // load .env.example (defaults to "false" which does not use dotenv-safe)
      }),
      new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
    ]),
  ]),
])

module.exports = config

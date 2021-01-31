const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const path = require('path');
const glob = require('glob');

module.exports = (env, argv) => {
  let dir = argv.dir || "./"
  const config = {
    entry: {
      js: glob.sync(dir + './lib/**/*.js'),
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: true,
              }
            },
            "sass-loader"
          ],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: ['@babel/plugin-proposal-class-properties']
            }
          }
        }
      ],
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
    ],
  };
  if (argv.hmr || true) {
    //config.mode = 'development';
    //config.devtool = "source-map";
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    config.plugins.push(new ReactRefreshWebpackPlugin());
    config.entry.js.push('webpack-hot-middleware/client');
    let babelRule = config.module.rules.filter(r => r.use.loader == "babel-loader")[0];
    let result = require.resolve('react-refresh/babel');
    babelRule.use.options.plugins.push(result)
    //babelRule.use.options.plugins.push([result, { skipEnvCheck: true }])

  }
  if (argv.mode === 'none') {
    config.output.filename = 'dotcom.react.js';
  }

  if (argv.mode === 'production') {
    config.output.filename = 'dotcom.react.min.js';
  }

  return config;
};

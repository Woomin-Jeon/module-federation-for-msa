const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;

const {
  BUILD_FILE_RELATIVE_PATH,
  APP_1_NAME,
  APP_1_PORT,
  MODULE_FEDERATION_PLUGIN_CONFIG,
} = require('../bundle.config');

module.exports = (_, env) => {
  const IS_PROD = env.mode === 'production';

  return ({
    entry: {
      index: './src/index.tsx',
    },
    output: {
      path: path.resolve(__dirname, BUILD_FILE_RELATIVE_PATH),
      filename: '[name].js',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: require.resolve('babel-loader'),
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {
        '@src': path.resolve(__dirname, 'src'),
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
      }),
      new ModuleFederationPlugin({
        name: APP_1_NAME,
        filename: `${APP_1_NAME}.js`,
        exposes: { './App1': './src/App1' },
        shared: MODULE_FEDERATION_PLUGIN_CONFIG().shared,
      }),
    ],
    devServer: {
      port: APP_1_PORT,
      historyApiFallback: {
        index: './src/index.html',
      },
    },
    ...(IS_PROD ? {} : { devtool: 'inline-source-map' }),
  });
};

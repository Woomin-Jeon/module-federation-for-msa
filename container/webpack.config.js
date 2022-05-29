const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;

const {
  BUILD_FILE_RELATIVE_PATH,
  APP_CONTAINER_PORT,
  COPY_PLUGIN_CONFIG,
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
      new CopyWebpackPlugin({
        ...COPY_PLUGIN_CONFIG(),
      }),
      new ModuleFederationPlugin({
        name: 'container',
        ...MODULE_FEDERATION_PLUGIN_CONFIG(env.mode),
      }),
    ],
    devServer: {
      port: APP_CONTAINER_PORT,
      historyApiFallback: {
        index: './src/index.html',
      },
    },
    ...(IS_PROD ? {} : { devtool: 'inline-source-map' }),
  });
};

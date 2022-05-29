const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;

const {
  BUILD_FILE_RELATIVE_PATH,
  APP_2_NAME,
  APP_2_PORT,
  MODULE_FEDERATION_PLUGIN_CONFIG,
} = require('../bundle.config');

module.exports = () => ({
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
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new ModuleFederationPlugin({
      name: APP_2_NAME,
      filename: `${APP_2_NAME}.js`,
      exposes: { './App2': './src/App2' },
      shared: MODULE_FEDERATION_PLUGIN_CONFIG().shared,
    }),
  ],
  devServer: {
    port: APP_2_PORT,
    historyApiFallback: {
      index: './src/index.html',
    },
  },
});

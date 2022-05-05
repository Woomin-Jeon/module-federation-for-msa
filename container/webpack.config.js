const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;

const { dependencies } = require('./package.json');

module.exports = () => ({
  entry: {
    index: './src/index.tsx',
  },
  output: {
    path: path.resolve(__dirname, './build'),
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
      name: 'container',
      remotes: {
        app1: 'app1@http://localhost:9000/app1.js',
        app2: 'app2@http://localhost:9100/app2.js',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: dependencies.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: dependencies['react-dom'],
        },
        recoil: {
          singleton: true,
          requiredVersion: dependencies.recoil,
        },
      },
    }),
  ],
  devServer: {
    port: 8000,
    historyApiFallback: {
      index: './src/index.html',
    },
  },
});

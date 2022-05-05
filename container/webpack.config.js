const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

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
  ],
  devServer: {
    historyApiFallback: {
      index: './src/index.html',
    },
  },
});

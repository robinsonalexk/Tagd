const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/index.jsx'),
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
    host: '0.0.0.0',
    client: {
      overlay: {
        warnings: false,
        errors: true
      }
    },
  },
  watchOptions: {
    poll: 1000
  },
  module: {
    rules: [
        {
            test: /\.(js|jsx)$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: { presets: ['@babel/preset-env', ["@babel/preset-react", {"runtime": "automatic"}]] }
            }
        },
        {
            test: /\.s[ac]ss$/i,
            use: [ "style-loader", "css-loader",
            {
                loader: "sass-loader",
                options: {
                    implementation: require("sass"),
                },
            }]
        },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new ESLintPlugin({
      extensions: [`js`, `jsx`],
      exclude: [
        `/node_modules/`
      ]
    }),   
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
const path = require("path");
const entryPath = "js";
const entryFile = "App.js";
const dotenv = require('dotenv');
const webpack = require('webpack');

module.exports = () => {
  const env = dotenv.config().parsed;

  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    entry: ["whatwg-fetch", `./${entryPath}/${entryFile}`],
    output: {
      filename: "out.js",
      path: path.resolve(__dirname, `${entryPath}/build`)
    },
    devServer: {
      contentBase: path.join(__dirname),
      publicPath: "/build/",
      compress: true,
      port: 3001
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin(envKeys)
    ]
  }
};

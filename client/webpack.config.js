const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const { resolve } = require("path");
const webpack = require("webpack");
const zlib = require("zlib");

const cleanOptions = {
  root: __dirname,
  verbose: true,
  dry: false,
  exclude: [],
};

module.exports = {
  entry: ["./src/main.js"],
  mode: "production",
  output: {
    path: resolve(__dirname, "./dist"),
    publicPath: "/",
    filename: "[name].js",
  },
  devServer: {
    hot: true,
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.(scss|css)$/,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(cleanOptions),
    new CopyPlugin({
      patterns: [
        {
          from: "static/*",
          to({ context, absoluteFilename }) {
            return "[name][ext]";
          },
        },
      ],
    }),
    new CompressionPlugin({
      filename: "[path][base].gz",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new CompressionPlugin({
      filename: "[path][base].br",
      algorithm: "brotliCompress",
      test: /\.(js|css|html|svg)$/,
      compressionOptions: {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
        },
      },
      threshold: 10240,
      minRatio: 0.8,
      deleteOriginalAssets: false,
    }),
  ],
  resolve: {
    alias: {
      "react/lib/ReactDom": "react-dom/lib/ReactDom",
    },
    extensions: [".js", ".jsx"],
  },
};

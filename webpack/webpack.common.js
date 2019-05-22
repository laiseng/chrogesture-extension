const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    popup: path.join(__dirname, "../src/popup.ts"),
    options: path.join(__dirname, "../src/options.ts"),
    background: path.join(__dirname, "../src/background.ts"),
    content_script: path.join(__dirname, "../src/content_script.ts")
  },
  output: {
    path: path.join(__dirname, "../dist/js"),
    filename: "[name].js"
  },
  optimization: {
    splitChunks: {
      name: "vendor",
      chunks: "initial"
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".html"]
  },
  plugins: [
    // exclude locale files in moment
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new CopyPlugin(
      [
        {
          from: path.resolve(__dirname, "../src/ui"),
          to: path.resolve(__dirname, "../dist/ui"),
          force: true
        },
        {
          from: path.resolve(__dirname, "../manifest.json"),
          to: path.resolve(__dirname, "../dist/manifest.json"),
          force: true
        }
      ],
      { copyUnmodified: true, logLevel: "trace" }
    )
  ]
};

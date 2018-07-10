var webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const _ = require('lodash');

var commitHash = require('child_process')
  .execSync('git rev-parse --short HEAD')
  .toString();
// const I18nPlugin = require("i18n-webpack-plugin");

// const languages = {
// 	"en": require("./locales/locale-en.json"),
// 	"es": require("./locales/locale-es.json"),
//   "it": require("./locales/locale-it.json"),
//   "ja": require("./locales/locale-ja.json"),
// };

var entry = process.env.NODE_ENV === 'production' ? './src/index.ts' : './tests/index.ts';
var path = process.env.NODE_ENV === 'production' ? '/functions' : '/_tests';

var config = {
  // entry: "./src/index.ts",
  entry: entry,
  output: {
    filename: "index.js",
    // path: __dirname + "/functions",
    path: __dirname + path,
    library: '',
    libraryTarget: 'commonjs'
  },

  // Enable sourcemaps for debugging webpack's output.
  // devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
        exclude: /node_modules/
      },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      // { enforce: "pre", test: /\.js$/, loader: "source-map-loader", exclude: /node_modules/ }
    ]
  },

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: [nodeExternals()],

  // externals: {
  //     // "react": "React",
  //     // "react-dom": "ReactDOM"
  // },

  plugins: [
    new webpack.DefinePlugin({
      __COMMIT_HASH__: JSON.stringify(commitHash),
    }),
    new CopyWebpackPlugin([{
      from: 'package.json',
      transform: function (content, path) {
        var package = JSON.parse(content);

        // ({id, title}) => ({id, title})

        var rtn = _.pick(package, ['name', 'description', 'version', 'dependencies']);
        return JSON.stringify(rtn, null, 2);
      },
    }, ]),
    // new webpack.EnvironmentPlugin({
    //   NODE_ENV: 'production', // use 'development' unless process.env.NODE_ENV is defined
    //   DEBUG: "*",
    // }),
    // new I18nPlugin(
    // 	languages[language]
    // )
  ]
};

if (process.env.NODE_ENV !== 'production') {
  config.devtool = "inline-source-map"; // source-map | inline-source-map
}

module.exports = config;
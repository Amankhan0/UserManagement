const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    publicPath: "http://localhost:3005/",
  },
  devServer: {
    port: 3005,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader","postcss-loader"],
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "usermanagement",
      filename: "remoteEntry.js",
      exposes: {
        "./store": "./src/store",
        "./usermanagement": "./src/App",
        "./UserApiReducer": "./src/features/UserApiReducer",
        "./UserManagementReducer": "./src/features/UserManagementReducer",
        "./UserPaginationReducer": "./src/features/UserPaginationReducer",
        "./UserRoleSlice": "./src/features/UserRoleSlice",
      },
      shared: {
        react: { singleton: true, requiredVersion: "18", eager: true },
        "react-dom": { singleton: true, requiredVersion: "18", eager: true },
        "react-redux": { singleton: true, requiredVersion: "^9.2.0", eager: true },
        "react-router-dom": { singleton: true, requiredVersion: "^7.1.3", eager: true },
        "@reduxjs/toolkit": { singleton: true, requiredVersion: "^2.5.1", eager: true },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

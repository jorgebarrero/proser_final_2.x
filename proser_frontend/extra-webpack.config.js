module.exports = {
  module: {
    rules: [
      {
        test: /\.cool$/,
        use: "cool-loader",
        resolve: {
          alias: {
            "./dist/cpexcel.js": "",
            "./xlsx.js": "./dist/xlsx.core.min.js"
          }
        }
      }
    ]
  }
};

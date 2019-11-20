module.exports = {
    entry: './client/app',
    mode: 'development',
    output: {
      path: __dirname,
      filename: './bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
      },
    devtool: 'source-maps',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        }
      ]
    }
  }
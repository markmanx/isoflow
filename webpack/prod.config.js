const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  target: 'web',
  entry: {
    'index': './src/Isoflow.tsx',
    '/nodeExports': './src/nodeExports.ts',
    '/isopacks': './src/isopacks/index.ts',
    '/isopacks/aws': './src/isopacks/aws/index.tsx',
    '/isopacks/basic': './src/isopacks/basic/index.ts',
    '/isopacks/networking': './src/isopacks/networking/index.ts',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React'
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'ReactDOM',
      root: 'ReactDOM'
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      PACKAGE_VERSION: JSON.stringify(require("../package.json").version),
      REPOSITORY_URL: JSON.stringify(require("../package.json").repository.url),
    })
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [new TsconfigPathsPlugin()]
  }
};

const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const webpack = require('webpack');

const entry = {
  index: './src/Isoflow.tsx',
  '/standaloneExports': './src/standaloneExports.ts'
};

const externals = {
  react: 'react',
  'react-dom': 'react-dom',
  'react/jsx-runtime': 'react/jsx-runtime'
};

const common = {
  mode: 'production',
  target: 'web',
  entry,
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
        type: 'asset/inline'
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [new TsconfigPathsPlugin()]
  }
};

const createPlugins = () => [
  new webpack.DefinePlugin({
    PACKAGE_VERSION: JSON.stringify(require('../package.json').version),
    REPOSITORY_URL: JSON.stringify(require('../package.json').repository.url)
  })
];

module.exports = [
  {
    ...common,
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: '[name].js',
      library: { type: 'commonjs2' }
    },
    externalsType: 'commonjs',
    externals,
    plugins: createPlugins()
  },
  {
    ...common,
    experiments: { outputModule: true },
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: '[name].mjs',
      library: { type: 'module' },
      module: true
    },
    externalsType: 'module',
    externals,
    plugins: createPlugins()
  }
];
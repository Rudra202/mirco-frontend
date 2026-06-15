// ---------------------------------------------------------------------------
// Workflow App — Webpack Configuration
// Micro-frontend remote that exposes the Workflow application to the shell
// host via Module Federation.
// ---------------------------------------------------------------------------
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = (env, argv) => {
  const isDev = argv.mode === 'development';

  return {
    entry: './src/index.ts',

    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: 'auto',
      clean: true,
    },

    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              compilerOptions: { module: 'esnext' },
            },
          },
          exclude: /node_modules\/(?!@platform)/,
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
      ],
    },

    plugins: [
      // Expose Workflow entry so the shell can consume it
      new ModuleFederationPlugin({
        name: 'workflow',
        filename: 'remoteEntry.js',
        exposes: {
          './WorkflowApp': './src/app.tsx',
        },
        shared: {
          react:      { singleton: true, requiredVersion: '^18.0.0' },
          'react-dom': { singleton: true, requiredVersion: '^18.0.0' },
        },
      }),

      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
    ],

    devServer: {
      port: 3002,
      hot: true,
      historyApiFallback: true,
      headers: { 'Access-Control-Allow-Origin': '*' },
    },

    devtool: isDev ? 'eval-cheap-module-source-map' : 'source-map',
  };
};

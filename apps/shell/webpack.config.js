// ---------------------------------------------------------------------------
// Shell App — Webpack Configuration
// Serves as the host application in the micro-frontend architecture. Loads
// remote modules (dashboard, workflow, reports, settings) via Module Federation.
// ---------------------------------------------------------------------------
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = (env, argv) => {
  // Detect dev vs. production mode from CLI args
  const isDev = argv.mode === 'development';

  return {
    // Application entry point
    entry: './src/index.ts',

    // Build output
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: 'auto',          // let webpack decide the public path at runtime
      clean: true,                 // wipe dist/ before each build
    },

    // Module resolution: allow importing without file extensions
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },

    // Loaders — transform source files before bundling
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,           // skip type-checking for faster builds
              compilerOptions: { module: 'esnext' },
            },
          },
          // Include @platform packages (monorepo internal packages) even though
          // they live inside node_modules
          exclude: /node_modules\/(?!@platform)/,
        },
        {
          test: /\.css$/,
          // Process CSS in chain: postcss → css → style (injected into DOM)
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
      ],
    },

    plugins: [
      // Module Federation — the shell consumes remotes from each micro-frontend
      new ModuleFederationPlugin({
        name: 'shell',
        remotes: {
          dashboard: 'dashboard@http://localhost:3001/remoteEntry.js',
          workflow:  'workflow@http://localhost:3002/remoteEntry.js',
          reports:   'reports@http://localhost:3003/remoteEntry.js',
          settings:  'settings@http://localhost:3004/remoteEntry.js',
        },
        // Shared dependencies — only one copy of each library is loaded
        shared: {
          react:            { singleton: true, requiredVersion: '^18.0.0' },
          'react-dom':      { singleton: true, requiredVersion: '^18.0.0' },
          'react-router-dom': { singleton: true, requiredVersion: '^7.0.0' },
          zustand:          { singleton: true, requiredVersion: '^5.0.0' },
        },
      }),

      // Generate index.html from template and inject <script> tags
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
    ],

    // Dev server configuration
    devServer: {
      port: 3000,
      hot: true,                       // Hot Module Replacement
      historyApiFallback: true,        // SPA fallback — serve index.html for all routes
      headers: {
        'Access-Control-Allow-Origin': '*',  // allow cross-origin requests from remotes
      },
    },

    // Source maps: faster eval in dev, full source-map in production
    devtool: isDev ? 'eval-cheap-module-source-map' : 'source-map',
  };
};

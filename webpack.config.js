const path = require('path');
const fs = require('fs');

const { DefinePlugin } = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const jsonImporter = require('node-sass-json-importer');
// some plugins are conditionally-loaded as they are also conditionally used.

module.exports = (env, argv) => {
  const isDev = argv.mode === 'development';
  const isLiveReload = !!argv.liveReload;
  const isTest = env.TEST;

  let publicPath = '/';
  if (env.PUBLIC_PATH) {
    // if we have an array, it means we've probably overriden env in the CLI
    // from a predefined env in a yarn/npm script
    if (Array.isArray(env.PUBLIC_PATH)) {
      // so we take the last one
      publicPath = env.PUBLIC_PATH[env.PUBLIC_PATH.length - 1];
    } else {
      publicPath = env.PUBLIC_PATH;
    }
  }

  const config = {
    context: __dirname,
    entry: [path.resolve(__dirname, 'src/index.tsx')],
    output: {
      path: path.resolve(__dirname, 'build'),
      publicPath,
      filename: 'app.[hash:6].js',
      chunkFilename: '[name].[chunkhash:6].js',
    },
    devtool: (() => {
      if (isTest) return;
      if (isLiveReload) return 'inline-sourcemap';
      if (isDev) return 'eval-source-map';
      // else, prod
      return 'source-map';
    })(),
    resolve: {
      extensions: ['.tsx', '.jsx', '.js', '.ts'],
      // most of it is to avoid duplication of packages in the codebase
      // NOTE: (there has to be a better way than doing that manually!!!)
      alias: {
        // make all dependencies using react and related use our versions
        react: path.resolve('./node_modules/react'),
        'react-dom': path.resolve('./node_modules/react-dom'),
        'react-router-dom': path.resolve('./node_modules/react-router-dom'),
        redux: path.resolve('./node_modules/redux'),
        // other packages
        classnames: path.resolve('./node_modules/classnames'),
        // go package uses a slightly earlier version of axios, link it to ours
        axios: path.resolve('./node_modules/axios'),
        // point directly to the ES6 module entry point, to be processed by us
        'franklin-sites': fs.realpathSync(
          `${__dirname}/node_modules/franklin-sites/src/components/index.ts`
        ),
        // replace all usage of specific lodash submodules (from dependencies)
        // with their corresponding ES modules from lodash-es (less duplication)
        // (just looked at node_modules to see what packages were used, but
        // didn't distinguish between used by devDeps or not)
        'lodash._reinterpolate': path.resolve(
          './node_modules/lodash-es/_reInterpolate'
        ),
        'lodash.camelcase': path.resolve('./node_modules/lodash-es/camelCase'),
        'lodash.clonedeep': path.resolve('./node_modules/lodash-es/cloneDeep'),
        'lodash.forin': path.resolve('./node_modules/lodash-es/forIn'),
        'lodash.get': path.resolve('./node_modules/lodash-es/get'),
        'lodash.isempty': path.resolve('./node_modules/lodash-es/isEmpty'),
        'lodash.isplainobject': path.resolve(
          './node_modules/lodash-es/isPlainObject'
        ),
        'lodash.memoize': path.resolve('./node_modules/lodash-es/memoize'),
        'lodash.pickby': path.resolve('./node_modules/lodash-es/pickBy'),
        'lodash.set': path.resolve('./node_modules/lodash-es/set'),
        'lodash.sortby': path.resolve('./node_modules/lodash-es/sortBy'),
        'lodash.template': path.resolve('./node_modules/lodash-es/template'),
        'lodash.templatesettings': path.resolve(
          './node_modules/lodash-es/templateSettings'
        ),
        'lodash.unset': path.resolve('./node_modules/lodash-es/unset'),
      },
      symlinks: false,
    },
    // MODULE
    module: {
      rules: [
        // JavaScript and Typescript files
        {
          test: /\.(js|jsx|tsx|ts)$/,
          exclude: /node_modules\/((?!protvista-msa|react-msa-viewer|franklin-sites|protvista-uniprot).*)/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        },
        /**
         * Worker required for msa-react-viewer. Gustavo looking at
         * making dependency optional
         * */
        {
          test: /\.worker\.js$/,
          use: { loader: 'worker-loader' },
        },
        // Stylesheets
        {
          test: /\.(css|sass|scss)$/,
          include: [
            path.resolve(__dirname, 'src'),
            // We use realpathSync otherwise doesn't work with symlinks
            fs.realpathSync(`${__dirname}/node_modules/franklin-sites`),
            fs.realpathSync(`${__dirname}/node_modules/rheostat`),
            fs.realpathSync(`${__dirname}/node_modules/litemol/dist/css`),
            fs.realpathSync(
              `${__dirname}/node_modules/@geneontology/ribbon/es`
            ),
            fs.realpathSync(
              `${__dirname}/node_modules/interaction-viewer/styles`
            ),
          ],
          use: [
            {
              loader: isLiveReload
                ? 'style-loader'
                : MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader', // translates CSS into CommonJS
            },
            {
              loader: 'sass-loader', // compiles Sass to CSS
              options: {
                sassOptions: {
                  includePaths: [
                    fs.realpathSync(
                      `${__dirname}/node_modules/franklin-sites/src/styles`
                    ),
                  ],
                  importer: jsonImporter({ convertCase: true }),
                },
              },
            },
          ],
        },
        // SVGs in stylesheets
        {
          test: /\.svg$/i,
          issuer: /\.(css|scss)?$/,
          loader: 'svg-url-loader',
        },
        // rest of SVGs
        {
          test: /\.svg$/i,
          include: [
            path.resolve(__dirname, 'src'),
            fs.realpathSync(`${__dirname}/node_modules/franklin-sites`),
          ],
          issuer: /\.(t|j)sx?$/,
          use: [
            {
              loader: '@svgr/webpack',
            },
          ],
        },
        // Fonts
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          // NOTE: watch out, this *only* includes litemol, if we need to load
          // NOTE: fonts from somewhere else we'll have to add it here.
          include: [
            fs.realpathSync(`${__dirname}/node_modules/litemol/dist/fonts`),
          ],
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[contenthash:6].[ext]',
                outputPath: 'fonts/',
              },
            },
          ],
        },
        // SVGs from nightingale and protvista packages
        {
          test: /\.svg$/,
          include: [
            fs.realpathSync(`${__dirname}/node_modules/protvista-datatable`),
            fs.realpathSync(`${__dirname}/node_modules/protvista-uniprot`),
          ],
          loader: 'svg-inline-loader',
        },
        {
          test: /\.(jpe?g|png|gif|ico)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[contenthash:6].[ext]',
              },
            },
          ],
        },
      ],
    },
    // END MODULE
    stats: {
      children: false,
      assetsSort: '!size',
      // groupAssetsByChunk: true,
    },
    // PLUGINS
    plugins: [
      !isLiveReload &&
        new (require('clean-webpack-plugin').CleanWebpackPlugin)(),
      new HtmlWebPackPlugin({
        template: `${__dirname}/index.html`,
        filename: 'index.html',
      }),
      !isDev &&
        new HtmlWebPackPlugin({
          template: `${__dirname}/404.html`,
          filename: '404.html',
        }),
      new DefinePlugin({
        BASE_URL: JSON.stringify(publicPath),
        LIVE_RELOAD: JSON.stringify(isLiveReload),
      }),
      !isLiveReload &&
        new (require('workbox-webpack-plugin').InjectManifest)({
          swSrc: `${__dirname}/src/service-worker/service-worker.ts`,
          // TODO: remove following line whenever we manage to reduce size of entrypoint
          maximumFileSizeToCacheInBytes: 1024 * 1024 * 10, // 10MB
          dontCacheBustURLsMatching: /\.[\da-f]{6}\.[\w]{2,5}$/i,
          // exclude from precaching because one browser will never need all fonts
          // formats at the same time, will cache later whichever is actually used
          exclude: [/fonts/],
        }),
      !isLiveReload &&
        !isTest &&
        new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)({
          analyzerMode: 'disabled',
          generateStatsFile: true,
          statsOptions: { source: false },
        }),
      !isLiveReload &&
        new MiniCssExtractPlugin({
          filename: '[name].[contenthash:6].css',
          chunkFilename: '[name].[contenthash:6].css',
        }),
    ].filter(Boolean),
    // END PLUGINS
  };

  if (isLiveReload) {
    config.devServer = {
      contentBase: path.join(__dirname, 'build'),
      compress: true,
      host: 'localhost',
      port: 0,
      historyApiFallback: true,
      stats: 'minimal',
      // use a browser specified in the user's environment, otherwise use default
      open: process.env.BROWSER || true,
    };
  }

  if (!isDev) {
    config.optimization = {
      runtimeChunk: true,
      // when updating webpack check this URL to adapt the different default
      // https://webpack.js.org/plugins/split-chunks-plugin/#optimizationsplitchunks
      splitChunks: {
        chunks: 'async',
        minSize: 30000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 6,
        maxInitialRequests: 4,
        automaticNameDelimiter: '~',
        cacheGroups: {
          sentry: {
            test: /[\\/]node_modules[\\/]@sentry[\\/]/,
            name: 'sentry',
            chunks: 'all',
          },
          geneontology: {
            // list the package to extract into its own bundle, plus all its
            // dependencies used *only* by it (use `yarn why <dependency>` to find)
            test: /[\\/]node_modules[\\/]@geneontology|amigo2-instance-data|react-icons|react-popper|react-transition-group|popper\.js|underscore|bbop-core[\\/]/,
            name: 'geneontology',
            chunks: 'all',
          },
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'react',
            chunks: 'all',
          },
          litemol: {
            test: /[\\/]node_modules[\\/](litemol)[\\/]/,
            name: 'litemol',
            chunks: 'all',
          },
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'default-vendors',
            priority: -10,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    };
  }

  return config;
};

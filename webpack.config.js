/*
 * @copyright EveryWorkflow. All rights reserved.
 */

const Encore = require('@symfony/webpack-encore');
const path = require('path');
const dotenv = require('dotenv');
const WorkboxPlugin = require('workbox-webpack-plugin');
const { resolveTsAliases } = require('resolve-ts-aliases');

const compileEncoreList = [
    {
        public_path: 'http://localhost:8085/build-frontend',
        manifest_path: 'build-frontend',
        output_path: 'public/build-frontend/',
        entry: {
            name: 'frontend',
            src: './assets/Frontend.tsx'
        }
    },
    {
        public_path: 'http://localhost:8085/build-admin-panel',
        manifest_path: 'build-admin-panel',
        output_path: 'public/build-admin-panel/',
        entry: {
            name: 'admin_panel',
            src: './assets/AdminPanel.tsx'
        }
    }
];

const exportConfigList = [];

compileEncoreList.forEach(encoreItem => {
    // Manually configure the runtime environment if not already configured yet by the "encore" command.
    // It's useful when you use tools that rely on webpack.config.js file.
    if (!Encore.isRuntimeEnvironmentConfigured()) {
        Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
    }

    Encore
        .setOutputPath(encoreItem.output_path)
        .setPublicPath(encoreItem.public_path)
        // only needed for CDN's or sub-directory deploy
        // .setManifestKeyPrefix('build/')

        .addEntry(encoreItem.entry.name, encoreItem.entry.src)

    // enables the Symfony UX Stimulus bridge (used in assets/bootstrap.js)
    // .enableStimulusBridge('./assets/controllers.json')

        // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
        // .splitEntryChunks()

        // will require an extra script tag for runtime.js
        // but, you probably want this, unless you're building a single-page app
        // .enableSingleRuntimeChunk()
        // .disableSingleRuntimeChunk()

        /*
         * FEATURE CONFIG
         *
         * Enable & configure other features below. For a full
         * list of features, see:
         * https://symfony.com/doc/current/frontend.html#adding-more-features
         */
        .cleanupOutputBeforeBuild()
        .enableBuildNotifications()
        .enableSourceMaps(!Encore.isProduction())
        // enables hashed filenames (e.g. app.abc123.css)
        .enableVersioning(Encore.isProduction())

        .configureBabel((config) => {
            config.plugins.push('@babel/plugin-proposal-class-properties');
        })

        // enables @babel/preset-env polyfills
        .configureBabelPresetEnv((config) => {
            config.useBuiltIns = 'usage';
            config.corejs = 3;
        })

        // enables Sass/SCSS support
        .enableSassLoader()

        // processes files ending in .less
        .enableLessLoader((options) => {
            options.lessOptions = {
                javascriptEnabled: true,
            };
        })

        // uncomment if you use TypeScript
        .enableTypeScriptLoader()

        // uncomment if you use React
        .enableReactPreset()

        .addPlugin(new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
        }))

        // uncomment to get integrity="..." attributes on your script & link tags
        // requires WebpackEncoreBundle 1.4 or higher
        .enableIntegrityHashes(Encore.isProduction())

        // uncomment if you're having problems with a jQuery plugin
        //.autoProvidejQuery()
        .configureDefinePlugin(options => {
            const env = dotenv.config();
            
            if (env.error) {
                throw env.error;
            }

            /* .env variables that are passed to react apps */
            const envVariables = [
                'API_BASE_URL',
                'API_END_POINT',
                'MEDIA_BASE_URL',
                'API_END_POINT_SWAP',
                'REACT_DEBUG',
                'REACT_REMOTE_DEBUG',
                'REACT_REDUCER_DEBUG',
            ];
            envVariables.forEach(envVariable => {
                options['process.env.' + envVariable] = JSON.stringify(env.parsed[envVariable]);
            });
            if (Encore.isProduction()) {
                options['process.env.REACT_DEBUG'] = 0;
                options['process.env.REACT_REMOTE_DEBUG'] = 0;
                options['process.env.REACT_REDUCER_DEBUG'] = 0;
            }
        })
    ;

    if (encoreItem.hasOwnProperty('manifest_path') && typeof encoreItem.manifest_path === 'string') {
        Encore.setManifestKeyPrefix(encoreItem.manifest_path);
    }
    if (encoreItem.hasOwnProperty('single_runtime_chunk') && encoreItem.single_runtime_chunk === true) {
        Encore.enableSingleRuntimeChunk();
    } else {
        Encore.splitEntryChunks()
            .disableSingleRuntimeChunk();
    }

    const config = Encore.getWebpackConfig();

    /* Setting unique entry name */
    config.name = encoreItem.entry.name;

    /* Adding tsconfig path mapping to webpack resolve alias */
    config.resolve.alias = resolveTsAliases(path.resolve("tsconfig"));

    exportConfigList.push({...config});
    Encore.reset();
});

module.exports = exportConfigList;

// DEVELOPMENT config

const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { DefinePlugin } = require('webpack')

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production'

    // const definePlugin = new DefinePlugin({
    //     'process.env': {
    //         NODE_ENV: JSON.stringify(argv.mode),
    //         BASE_URL: JSON.stringify(isProduction ? '/vue-simple-notes/' : '/')
    //     }
    // })

    return {
        mode: isProduction ? 'production' : 'development',
        entry: './src/main.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: "bundle-[name].js"
        },
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
            '@': path.resolve(__dirname, 'src')
            }
        },
        module: {
            rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
                }
            },
            {
                test: /\.scss$/,
                use: [
                'style-loader',
                'css-loader',
                'sass-loader'
                ]
            },
            {
                test: /\.svg$/,
                use: [
                {
                    loader: 'svg-inline-loader',
                    options: {
                    removeTags: true,
                    removingTags: ['title', 'desc'],
                    },
                },
                {
                    loader: 'vue-svg-loader',
                },
                ],
            }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
            filename: 'style.css'
            }),
            new VueLoaderPlugin(),
            new HtmlWebpackPlugin({
            template: 'public/index.html'
            }),
            // definePlugin
        ],
        devServer: {
            static: {
                directory: path.join(__dirname, 'dist')
            },
            historyApiFallback: true,
            compress: true,
            port: 3000,
            hot: true,
            open: true
        },
        optimization: {
            splitChunks: {
            cacheGroups: {
                vendors: {
                name: 'vendors',
                test: /[\\/]node_modules[\\/]/,
                priority: -10,
                chunks: 'initial'
                }
            }
            }
        }
    }
}

'use strict';

const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// CSS分离
const ExtractTextPlugin = require("extract-text-webpack-plugin");

var website = {
    publicPath:"http://localhost:8888/"
}

function resolve (dir) {
    return path.join(__dirname, '..', dir);
}


module.exports = {
    mode:'development',
    // 入口配置文件
    entry:{
        main:'./src/main.js',
    },
    // 配置解析路径的起点
    context:path.resolve(__dirname,'../'),
    // 编译指定输出的文件夹路径
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        publicPath:website.publicPath, //主要处理静态文件的路径
    },
    // 模块解析，标识模块之间的依赖关系。通过loader 可以支持任何语言以及预编译模块.
    module: {
        rules:[
            // CSS Loader
            {
                test:/\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use:[
                        {loader:"css-loader"},
                        {loader:"postcss-loader"},
                    ]
                })
            },
            // Image Loader
            {
                test:/\.(png|jpg|gif|jpeg)$/i,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:500,
                            outputPath:'image',  //打包后的图片放到images文件夹下
                        }
                    }
                ]
            },
            {
                test: /\.(htm|html)$/i,
                use:[ 'html-withimg-loader'] 
            },
            {
                test:/\.less$/,
                use:ExtractTextPlugin.extract({
                    use:['css-loader','less-loader','postcss-loader'],
                    fallback: "style-loader",
                })
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
            },
        ]
    },
    // 配置模块如何解析
    resolve: {},
    // webpack 插件安装
    plugins: [
        new uglify(),
        new HtmlWebpackPlugin({
            hash:true,
            template:'./src/index.html'
        }),
        new ExtractTextPlugin('css/style.css')
    ],
    // 配置webpack 开发服务环境
    devServer:{
        contentBase:path.resolve(__dirname,'../dist'),
        host:'localhost',
        compress:true,
        port:8888,
    }
};




// let resolvePath = path.resolve('node_modules/webpack-dev-server/client');
// console.log(resolvePath);
const path = require("path");
const webpack = require("webpack");
// 打包速度分析
const Alphabet = require("alphabetjs");
const chalk = require("chalk");
const str = Alphabet("360sk", "planar");
console.log(chalk.bgBlueBright("--------------------------------------------------"));
console.log(chalk.blue(str));
console.log(chalk.bgBlueBright("--------------------------------------------------"));
const glob = require("glob");
const fs = require("fs-extra");

function pathResolve(dir) {
    return path.resolve(process.cwd(), ".", dir);
}

// html页面访问路径
let fileValue = "";
// 应用基本URL
let baseUrl = "/";
let outputDir = "dist";
// const projectName = process.env.VUE_APP_NAME;
// if (process.env.NODE_ENV === "production") {
//     fileValue = "../../../modules/" + projectName + "/dist/";
//     baseUrl = "/static/modules/" + projectName + "/";
//     outputDir = "../../static/modules/" + projectName + "/";
//     console.log("清空“dist”目录下所有文件");
//     if (fs.pathExistsSync("./dist")) {
//         fs.emptyDir("./dist");
//     } else {
//         fs.mkdirs("./dist");
//     }
// }

function getEntry(globPath) {
    let entries = {};
    let tmp;
    glob.sync(globPath).forEach(function (entry) {
        tmp = entry.split("/").splice(-3);
        console.log("加载应用：" + tmp[1]);
        entries[tmp[1]] = {
            entry: "src/" + tmp[0] + "/" + tmp[1] + "/index.js",
            filename: fileValue + tmp[1] + ".html"
        };
        if (fs.pathExistsSync("src/" + tmp[0] + "/" + tmp[1] + "/index.html")) {
            // 如果当前模块定义html模板就使用模板
            entries[tmp[1]].template = "src/" + tmp[0] + "/" + tmp[1] + "/index.html";
        } else {
            entries[tmp[1]].template = "src/pages/template.html";
        }
    });
    return entries;
}

module.exports = {
    outputDir,
    publicPath: baseUrl,
    productionSourceMap: false,
    lintOnSave: true,
    pages: getEntry("./src/pages/*/index.js"),
    configureWebpack: {
        resolve: {
            alias: {
                "@": pathResolve("src"),
                "@js": pathResolve("src/js"),
                "@api": pathResolve("src/js/api"),
                "@imgs": pathResolve("src/assest/images"),
                "@style": pathResolve("src/assest/style"), // 样式
                "@pages": pathResolve("src/pages"), // 视图
                "@components": pathResolve("src/js/components") // 视图内的组件
            }
        },
        plugins: [
            new webpack.DefinePlugin({
                __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(process.env.NODE_ENV !== "production")
            })
        ],
        optimization: {
            splitChunks: {
                chunks: "all",
                cacheGroups: {
                    libs: {
                        name: "chunk-libs",
                        test: /[\\/]node_modules[\\/]/,
                        priority: 10,
                        chunks: "initial"
                    },
                    element: {
                        name: "element-plus",
                        priority: 20,
                        test: /[\\/]node_modules[\\/]_?element-plus(.*)/
                    },
                    commons: {
                        name: "chunk-commons",
                        test: pathResolve("src/components"),
                        priority: 5,
                        reuseExistingChunk: true // 表示是否使用已有的 chunk，如果为 true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的。
                    }
                }
            }
        }
    },
    chainWebpack: config => {
        // 仅在生产环境删除console
        if (process.env.NODE_ENV === "production") {
            // 引入terser-webpack-plugin
            const TerserPlugin = require("terser-webpack-plugin");

            // 添加新的 terser 配置
            config.optimization.minimizer("terser").use(TerserPlugin, [
                {
                    terserOptions: {
                        compress: {
                            drop_console: true,
                            drop_debugger: true,
                            warnings: false,
                            pure_funcs: ["console.log", "console.info", "console.warn", "console.error", "console.debug", "console.trace"]
                        },
                        mangle: true,
                        format: {
                            comments: false
                        }
                    },
                    extractComments: false
                }
            ]);
        }
        config.module.rule("svg").exclude.add(pathResolve("src/js/components/svg-icon")).end();

        config.module
            .rule("icons")
            .test(/\.svg$/)
            .include.add(pathResolve("src/js/components/svg-icon"))
            .end()
            .use("svg-sprite-loader")
            .loader("svg-sprite-loader")
            .options({ symbolId: "icon-[name]" })
            .end();

        config.module.rule("images").set("parser", {
            dataUrlCondition: {
                maxSize: 10 * 1024 // 4KiB
            }
        });

        config.plugin("define").tap(options => {
            // DefinePlugin注入全局变量
            options[0]["process.env"]["VUE_APP_MOCK_DATA"] = JSON.stringify(process.env.MOCK_DATA);
            return options;
        });

        // 自动分析重用的模块并且打包成单独的文件
        config.plugin("provide").use(webpack.ProvidePlugin, [
            {
                config: [pathResolve("src/js/config.js"), "default"],
                logs: [pathResolve("src/js/services/logs.js"), "default"]
            }
        ]);
    },
    devServer: {
        proxy: "http://stg1-ele-manage-web-api.daikuan.qihoo.net", // stg1环境
        // proxy: "http://stg2-ele-manage-web-api.daikuan.qihoo.net", // stg2环境
        // proxy: "http://10.96.144.165:8080",
        // proxy: {
        // '/mock-api': {
        //   target: `http://localhost:${port}`,
        //   changeOrigin: true,
        //   logLevel: 'debug',
        //   pathRewrite: {
        //     '^/mock-api': ''
        //   }
        // }
        // }
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        historyApiFallback: true,
        allowedHosts: "all",
        hot: false,
        port: process.env.VUE_APP_SERVER_PORT,
        open: process.env.VUE_APP_SERVER_OPEN === "true",
        client: {
            overlay: {
                warnings: false,
                errors: true
            }
        }
    }
};

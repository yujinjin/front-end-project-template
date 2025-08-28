import path from "node:path";
import fs from "fs";
import fg from "fast-glob";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import svgLoader from "vite-svg-loader";

/**
 * 遍历 src/pages 目录下的所有 index.js 文件，基于根目录 index.html 文件为模板
 * 在根目录下生成对应的 html 文件并引用其 index.js
 */
const generateHtmlFiles = () => {
    const rootDir = __dirname;
    const indexHtmlPath = path.resolve(rootDir, "src/pages/index.html");

    try {
        // 读取根目录下的 index.html 模板内容
        const templateHtml = fs.readFileSync(indexHtmlPath, "utf-8");

        // 使用 fast-glob 匹配所有 src/pages/**/index.js 文件
        const mainJsFiles = fg.sync("src/pages/**/*/index.js", {
            absolute: true,
            cwd: rootDir
        });

        // 为每个找到的 index.js 文件生成对应的 HTML 文件
        mainJsFiles.forEach(mainJsPath => {
            // 提取页面名称（即 index.js 所在的目录名）
            const pagePath = path.relative(path.resolve(rootDir, "src/pages"), mainJsPath).split("\\").slice(0, -1).join("/");

            const newHtmlPath = path.resolve(__dirname, "dist", `${pagePath}.html`);

            // 检查pages目录是否存在，如果不存在则创建
            if (!fs.existsSync(newHtmlPath)) {
                fs.mkdirSync(path.dirname(newHtmlPath), { recursive: true });
            }

            let newHtml = "";
            // 判断路径是否存在src/pages/**/*/index.html
            if (fs.existsSync(path.resolve(rootDir, "src/pages/" + pagePath + "/index.html"))) {
                newHtml = fs
                    .readFileSync(path.resolve(rootDir, "src/pages/" + pagePath + "/index.html"), "utf-8")
                    .replace(/<script type="module" src=".*?"><\/script>/, `<script type="module" src="/src/pages/${pagePath}/index.js"></script>`);
            } else {
                // 修改模板中的脚本引用路径
                newHtml = templateHtml.replace(/<script type="module" src=".*?"><\/script>/, `<script type="module" src="/src/pages/${pagePath}/index.js"></script>`);
            }
            // 写入新的 HTML 文件
            fs.writeFileSync(newHtmlPath, newHtml, "utf-8");
            console.info(`Generated HTML file: ${pagePath}.html`);
        });
    } catch (error) {
        console.error("Error generating HTML files:", error);
    }
};

/**
 * 获取多页面入口配置
 */
const getInputEntries = () => {
    const entries = {};
    const rootDir = __dirname;

    // 首先生成 HTML 文件
    generateHtmlFiles();

    // 使用 fast-glob 匹配所有 src/pages/**/index.js 文件
    const mainJsFiles = fg.sync("src/pages/**/*/index.js", {
        absolute: true,
        cwd: rootDir
    });

    // 为每个找到的 index.js 文件创建入口配置
    mainJsFiles.forEach(mainJsPath => {
        const pagePath = path.relative(path.resolve(rootDir, "src/pages"), mainJsPath).split("\\").slice(0, -1).join("/");
        // entries[pageName] = pageName + ".html";
        entries[pagePath.replace(/\//g, "_")] = path.resolve(__dirname, `dist/${pagePath}.html`);
    });
    return entries;
};

const moveBuildFiles = function ({ BUILD_STATIC_DIR, BUILD_HTML_DIR, VITE_APP_NAME }) {
    if (!BUILD_STATIC_DIR || !BUILD_HTML_DIR) {
        return;
    }
    BUILD_HTML_DIR = path.resolve(__dirname, BUILD_HTML_DIR.endsWith("/" + VITE_APP_NAME) ? BUILD_HTML_DIR : BUILD_HTML_DIR + "/" + VITE_APP_NAME);
    BUILD_STATIC_DIR = path.resolve(__dirname, BUILD_STATIC_DIR.endsWith("/" + VITE_APP_NAME) ? BUILD_STATIC_DIR : BUILD_STATIC_DIR + "/" + VITE_APP_NAME);

    if (fs.existsSync(BUILD_HTML_DIR)) {
        fs.rmSync(BUILD_HTML_DIR, { recursive: true });
    }
    if (fs.existsSync(BUILD_STATIC_DIR)) {
        fs.rmSync(BUILD_STATIC_DIR, { recursive: true });
    }
    fs.mkdirSync(BUILD_HTML_DIR, { recursive: true });
    fs.mkdirSync(BUILD_STATIC_DIR, { recursive: true });

    // 读取build html目录中的所有文件
    const htmlEntries = fs.readdirSync(path.resolve(__dirname, "dist/dist"), { withFileTypes: true });
    htmlEntries.forEach(entry => {
        if (entry.isFile()) {
            fs.copyFileSync(path.resolve(__dirname, "dist/dist/" + entry.name), path.resolve(__dirname, `${BUILD_HTML_DIR}/${entry.name}`));
        } else if (entry.isDirectory()) {
            fs.cpSync(path.resolve(__dirname, "dist/dist/" + entry.name), path.resolve(__dirname, `${BUILD_HTML_DIR}/${entry.name}`), { recursive: true });
        }
    });

    const entries = fs.readdirSync(path.resolve(__dirname, "dist"), { withFileTypes: true });
    entries.forEach(entry => {
        if (entry.isFile()) {
            fs.copyFileSync(path.resolve(__dirname, "dist/" + entry.name), path.resolve(__dirname, `${BUILD_STATIC_DIR}/${entry.name}`));
        } else if (entry.isDirectory() && entry.name !== "dist") {
            fs.cpSync(path.resolve(__dirname, "dist/" + entry.name), path.resolve(__dirname, `${BUILD_STATIC_DIR}/${entry.name}`), { recursive: true });
        }
    });
    fs.rmSync(path.resolve(__dirname, "dist"), { recursive: true });
};

export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), ["SERVER_", "VITE_", "BUILD_"]);

    const isDev = process.env.NODE_ENV === "development" || mode === "dev";
    return {
        base: command === "serve" || !env.BUILD_BASE_PATH ? "/" : env.BUILD_BASE_PATH.endsWith("/" + env.VITE_APP_NAME) ? env.BUILD_BASE_PATH : env.BUILD_BASE_PATH + "/" + env.VITE_APP_NAME,
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src"),
                "@pages": path.resolve(__dirname, "src/pages"),
                "@js": path.resolve(__dirname, "src/js"),
                "@components": path.resolve(__dirname, "src/js/components"),
                "@style": path.resolve(__dirname, "src/assest/style"),
                "@imgs": path.resolve(__dirname, "src/assest/images"),
                "@api": path.resolve(__dirname, "src/js/api")
            }
        },
        define: {
            VITE_APP_BUILD_TIME: new Date().getTime(),
            VITE_MOCK_DATA: JSON.stringify(process.env.MOCK_DATA || "0")
        },
        // plugins,
        plugins: [
            vue(),
            vueJsx(),
            svgLoader({
                defaultImport: "component"
            })
        ],
        esbuild: {
            drop: isDev ? [] : ["console", "debugger"]
        },
        server: {
            host: true,
            port: Number(env.SERVER_PORT) || 8080,
            open: env.SERVER_OPEN === "true" && "/dist/",
            proxy: {
                // '/api': 'http://localhost:4567'
            },
            warmup: {
                clientFiles: ["./src/pages/**/*.vue"]
            }
        },
        build: {
            rollupOptions: {
                input: getInputEntries(),
                output: {
                    entryFileNames: "assets/js/[name]-[hash].js",
                    chunkFileNames: "assets/js/[name]-[hash].js",
                    assetFileNames: assetInfo => {
                        if (assetInfo.names[0]?.endsWith(".css")) {
                            return "assets/style/[name]-[hash].[ext]";
                        } else if (/\.(eot|svg|ttf|woff|woff2)$/.test(assetInfo.names[0])) {
                            return "assets/fonts/[name]-[hash].[ext]";
                        } else if (/\.(png|jpg|jpeg|gif|webp|bmp|svga|apng|tif)$/.test(assetInfo.names[0])) {
                            return "assets/images/[name]-[hash].[ext]";
                        }
                        return "assets/[ext]/[name]-[hash].[ext]";
                    },
                    // 配置输出文件名和路径
                    manualChunks(id) {
                        if (id.includes("src/js/config.js")) {
                            // 要单独打包的文件路径
                            return "config";
                        } else if (id.includes("node_modules")) {
                            if (id.includes("element-plus")) {
                                return "element-plus";
                            } else if (id.includes("echarts")) {
                                return "echarts";
                            }
                            return "vendor";
                        }
                        // 其他文件可以按照默认规则打包
                        return;
                    }
                },
                // Rollup 构建完成后的回调钩子
                plugins: [
                    {
                        name: "move-to-static-dir",
                        closeBundle() {
                            moveBuildFiles(env);
                        }
                    }
                ]
            }
        }
    };
});

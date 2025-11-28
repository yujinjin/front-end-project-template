import path from "node:path";
import process from "node:process";
// import { type PluginOption, defineConfig } from "vite";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { viteVConsole } from "vite-plugin-vconsole";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "VITE_");
    // 现在可以通过 env 访问变量了
    console.log("环境变量：", env);
    console.log("接口地址：", env.VITE_APP_WEB_HASH);

    const isDev = process.env.NODE_ENV === "development" || mode === "dev";

    const PROJECT_CONTENT_PATH = "/";

    return {
        base: PROJECT_CONTENT_PATH,
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src"),
                "@views": path.resolve(__dirname, "src/views"),
                "@components": path.resolve(__dirname, "src/components"),
                "@style": path.resolve(__dirname, "src/assets/style"),
                "@imgs": path.resolve(__dirname, "src/assets/images"),
                "@api": path.resolve(__dirname, "src/api")
            }
        },
        define: {
            VITE_APP_BUILD_TIME: new Date().getTime(),
            VITE_APP_PROJECT_CONTENT_PATH: JSON.stringify(PROJECT_CONTENT_PATH),
            VITE_MOCK_DATA: JSON.stringify(process.env.MOCK_DATA || "0")
        },
        plugins: [
            vue(),
            vueJsx(),
            viteVConsole({
                entry: [path.resolve("src/main.ts")], // entry file
                enabled: isDev, // build production
                config: {
                    // vconsole options
                    log: {
                        maxLogNumber: 1000
                    },
                    theme: "light"
                }
            })
        ],
        esbuild: {
            drop: isDev ? [] : ["console", "debugger"]
        },
        server: {
            host: true,
            port: 8081,
            proxy: {
                // '/api': 'http://localhost:4567'
            },
            warmup: {
                clientFiles: ["./src/views/**/*.vue"]
            }
        },
        build: {
            rollupOptions: {
                output: {
                    entryFileNames: "assets/js/[name]-[hash].js",
                    chunkFileNames: "assets/js/[name]-[hash].js",
                    assetFileNames: assetInfo => {
                        if (assetInfo.names[0]?.endsWith(".css")) {
                            return "assets/style/[name]-[hash].[ext]";
                        } else if (/\.(eot|svg|ttf|woff|woff2)$/.test(assetInfo.names?.[0] || "")) {
                            return "assets/fonts/[name]-[hash].[ext]";
                        } else if (/\.(png|jpg|jpeg|gif|webp|bmp|svga|apng|tif)$/.test(assetInfo.names?.[0] || "")) {
                            return "assets/images/[name]-[hash].[ext]";
                        }
                        return "assets/[ext]/[name]-[hash].[ext]";
                    },
                    // 配置输出文件名和路径
                    manualChunks(id) {
                        if (id.includes("src/config.ts")) {
                            // 要单独打包的文件路径
                            return "config";
                        } else if (id.includes("node_modules")) {
                            if (id.includes("vant")) {
                                return "vant";
                            } else if (id.includes("vue")) {
                                return "vue";
                            }
                            return "vendor";
                        }
                        // 其他文件可以按照默认规则打包
                        return;
                    }
                }
            }
        }
    };
});

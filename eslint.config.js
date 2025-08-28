/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2022-10-20 13:55:12
 * @描述: eslint 配置（数组中的对象会按顺序执行：后面的对象可能会覆盖前面对象中指定的设置）
 */
import { defineConfig } from "eslint/config";
import globals from "globals";
import eslint from "@eslint/js";
import eslintPluginImportX from "eslint-plugin-import-x";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import eslintPluginVue from "eslint-plugin-vue";
import eslintPluginJsonc from "eslint-plugin-jsonc";
import eslintPluginMarkdown from "eslint-plugin-markdown";
import eslintPluginVitest from "eslint-plugin-vitest";
// import eslintConfigPrettier from "eslint-config-prettier";

// const DOMGlobals = ['window', 'document']
// const NodeGlobals = ['module', 'require']

export default defineConfig([
    /** js推荐配置*/
    eslint.configs.recommended,
    /** vue推荐配置 */
    ...eslintPluginVue.configs["flat/recommended"],
    /** markdown 推荐配置 */
    ...eslintPluginMarkdown.configs.recommended,
    /** jsonc 推荐配置（一定放在tseslint后面，不然json文件会提示报错） */
    ...eslintPluginJsonc.configs["flat/recommended-with-jsonc"],
    /**
     * prettier 配置
     * 会合并根目录下的.prettier.config.js 文件
     */
    eslintPluginPrettierRecommended,
    /** import-x 配置 */
    {
        plugins: {
            "import-x": eslintPluginImportX
        },
        settings: {
            "import-x/resolver": {
                node: true
            }
        },
        rules: {
            ...eslintPluginImportX.configs.recommended.rules,
            "import-x/no-unresolved": "off",
            "import-x/order": "error",
            "import-x/consistent-type-specifier-style": ["error", "prefer-inline"],
            "import-x/namespace": "off"
            // "import-x/named": "off"
        }
    },
    /**
     * 通用配置
     * @see https://typescript-eslint.io/rules
     * @see https://eslint.org/docs/latest/rules
     */
    {
        files: ["**/*.{js,mjs,cjs,jsx,mjsx,vue}"],
        settings: {
            "import/resolver": {
                alias: {
                    map: [
                        ["@", "./src"],
                        ["@pages", "./src/pages"],
                        ["@js", "./src/js"],
                        ["@components", "./src/components"],
                        ["@style", "./src/assest/style"],
                        ["@imgs", "./src/assest/images"],
                        ["@api", "./src/js/api"]
                    ]
                }
            }
        },
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.es2021,
                Nullable: true
            },
            parserOptions: {
                ecmaFeatures: {
                    jsx: true
                }
            }
        },
        rules: {
            // 允许调用 console 对象的方法
            "no-console": ["off"],
            // 是否使用 debugger
            "no-debugger": "error",
            // 禁止在循环中 出现 await
            "no-await-in-loop": "error",
            // 禁用不必要的 return await function()
            "no-return-await": "error",
            // 不允许使用 var
            "no-var": "error",
            // 生产模式禁止出现空语句块
            "no-empty": "error",
            // 禁止重复导入(imports)
            // "no-duplicate-imports": "error",
            // 禁用 tab
            "no-tabs": "error",
            // 要求使用 === 和 !==
            eqeqeq: ["error", "always"],
            // 禁用 Alert、prompt 和 confirm
            "no-alert": "error",
            // 警告：在 else 前有 return（如果 if 块中包含了一个 return 语句，else 块就成了多余的了。可以将其内容移至块外。）
            "no-else-return": "warn",
            // 禁用 eval()
            "no-eval": "error",
            // 禁用 eval()
            "no-implied-eval": "error",
            // 禁用不必要的嵌套块
            "no-lone-blocks": "error",
            // 禁用一成不变的循环条件
            "no-unmodified-loop-condition": "error",
            "no-unused-vars": "off",
            // 强制在 parseInt() 使用基数参数
            radix: "error",
            // 禁止在变量定义之前使用它们
            "no-use-before-define": "error",
            // 强制使用骆驼拼写法命名约定
            camelcase: ["error", { properties: "always" }],
            // 强制块语句的最大可嵌套深度
            "max-depth": ["error", 4],
            // 要求或禁止末尾逗号
            "comma-dangle": "error",
            // (默认) 要求尽可能地使用双引号（eslint9 弃用）
            // "quotes": ["error", "double"],
            // 如果有属性名称要求使用引号，则所有的属性名称都要使用引号；否则，禁止所有的属性名称使用引号（eslint9 弃用）
            // "quote-props": ["error", "consistent-as-needed"],
            // 针对匿名函数表达式必须空格 (比如 function () {})|针对命名的函数表达式禁止空格 (比如 function foo() {})|针对异步的箭头函数表达式必须空格 (比如 async () => {})。
            "space-before-function-paren": ["error", { anonymous: "always", named: "never", asyncArrow: "always" }]
        }
    },
    /** js 配置 */
    {
        files: ["*.js"],
        rules: {}
    },
    /** vue 配置 */
    {
        files: ["**/*.vue"],
        settings: {
            vue: {
                version: "3.x"
            }
        },
        languageOptions: {
            parser: eslintPluginVue.parser
        },
        rules: {
            // vue
            "vue/multi-word-component-names": "off"
        }
    },
    /** json 配置 */
    {
        files: ["*.json", "*.json5", "*.jsonc"],
        languageOptions: {
            // parser: "jsonc-eslint-parser"
        },
        rules: {}
    },
    /** 单元测试 配置 */
    {
        files: ["**/__tests__/**"],
        plugins: {
            vitest: eslintPluginVitest
        },
        languageOptions: {
            globals: {
                ...eslintPluginVitest.environments.env.globals
            }
        },
        rules: {
            "no-console": "off",
            "no-restricted-globals": "off",
            "no-restricted-syntax": "off",
            "vitest/no-disabled-tests": "error",
            "vitest/no-focused-tests": "error"
        }
    },
    /** 忽略文件 */
    {
        ignores: [".vscode/*", "node_modules", "dist", ".husky", "public", ".idea/"]
    }
]);

/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2022-10-20 13:55:12
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2023-01-05 14:24:37
 * @项目的路径: \front-end-project-template\.eslintrc.js
 * @描述: eslint 配置
 */

module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true,
        "vue/setup-compiler-macros": true
    },
    parser: "vue-eslint-parser",
    parserOptions: {
        parser: "@babel/eslint-parser",
        ecmaVersion: 2020,
        sourceType: "module",
        jsxPragma: "React",
        ecmaFeatures: {
            jsx: true,
            tsx: true
        }
    },
    plugins: ["prettier", "vue", "promise"],
    globals: {
        logs: true,
        config: true
    },
    settings: {
        "import/resolver": {
            alias: {
                map: [
                    ["@", "./src"],
                    ["@js", "./src/js"],
                    ["@api", "./src/js/api"],
                    ["@imgs", "./src/assest/images"],
                    ["@style", "./src/assest/style"], // 样式
                    ["@pages", "./src/pages"], // 视图
                    ["@components", "./src/js/components"] // 视图内的组件
                ],
                extensions: [".js", ".jsx", ".ts", ".tsx", ".vue"]
            }
        }
    },
    extends: ["plugin:vue/vue3-essential", "eslint:recommended", "prettier", "@vue/prettier", "plugin:promise/recommended"],
    rules: {
        "vue/script-setup-uses-vars": "error",
        "vue/custom-event-name-casing": "off",
        "no-use-before-define": "off",
        // args:不检查参数; caughtErrors:  catch 块的参数不检查; argsIgnorePattern: 参数的名字符合正则匹配不需要检测(下划线开头); varsIgnorePattern: 变量名称匹配正则模式不需要检测(下划线开头)
        "no-unused-vars": ["error", { args: "none", caughtErrors: "none", argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
        "space-before-function-paren": "off",
        "vue/attributes-order": "off",
        "vue/one-component-per-file": "off",
        "vue/html-closing-bracket-newline": "off",
        "vue/max-attributes-per-line": "off",
        "vue/multiline-html-element-content-newline": "off",
        "vue/singleline-html-element-content-newline": "off",
        "vue/attribute-hyphenation": "off",
        "vue/require-default-prop": "off",
        "vue/require-explicit-emits": "off",
        "vue/html-self-closing": [
            "error",
            {
                html: {
                    void: "always",
                    normal: "never",
                    component: "always"
                },
                svg: "always",
                math: "always"
            }
        ],
        "vue/multi-word-component-names": "off",
        "promise/always-return": "error",
        "promise/no-return-wrap": "error",
        "promise/param-names": "error",
        "promise/catch-or-return": "error",
        "promise/no-native": "off",
        "promise/no-nesting": "warn",
        "promise/no-promise-in-callback": "warn",
        "promise/no-callback-in-promise": "warn",
        "promise/avoid-new": "off",
        "promise/no-new-statics": "error",
        "promise/no-return-in-finally": "warn",
        "promise/valid-params": "warn"
    }
};

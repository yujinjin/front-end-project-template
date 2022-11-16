/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2022-10-20 13:55:12
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2022-10-24 14:00:18
 * @项目的路径: \360-manager-H5\.eslintrc.js
 * @描述: eslint 配置
 */

module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true
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
    extends: ["plugin:vue/vue3-essential", "eslint:recommended", "prettier", "plugin:promise/recommended"],
    rules: {
        "vue/script-setup-uses-vars": "error",
        "vue/custom-event-name-casing": "off",
        "no-use-before-define": "off",
        "no-unused-vars": [
            "error",
            {
                argsIgnorePattern: "^_",
                varsIgnorePattern: "^_"
            }
        ],
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

/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2022-10-21 10:44:06
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2022-10-31 16:28:43
 * @项目的路径: \360-manager-H5\src\js\main.js
 * @描述: 应用main 入口
 */
import { createApp } from "vue";
import ElementPlus from "element-plus";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import store from "@js/stores/";
import components from "@js/components/index";
import plugins from "@js/plugins/index";
import directives from "@js/services/directives";
import buttonPermissions from "@js/services/button-permissions";

import "@style/index.scss";
import "@style/icomoon.css";

/** App Main类 */
class AppMain {
    // 项目配置
    config;

    // 日志
    logs;

    // 当前vue实例
    vueAppInstance;

    // VUE存储状态
    store;

    // VUE 路由
    router;

    constructor(router) {
        this.initConfig();
        this.config = config;
        this.logs = logs;
        this.store = store;
        this.router = router;
        this.vueAppInstance = null;
    }

    // 初始化项目配置
    initConfig() {
        // TODO:
    }

    // 初始化
    async init(Appvue, userPermission) {
        this.vueAppInstance = this.initVue(Appvue);
        if (userPermission) {
            buttonPermissions();
        }
        this.mount("#app");
    }

    // 初始化vue
    initVue(Appvue) {
        const vueAppInstance = createApp(Appvue);
        // 是否启用对组件初始化、编译、渲染和更新的性能追踪
        vueAppInstance.config.performance = config.isDebug;
        // 非debug 模式
        if (!config.isDebug) {
            /**
             * @param {String}  errorMessage   错误信息
             * @param {String}  scriptURI      出错的文件
             * @param {Long}    lineNumber     出错代码的行号
             * @param {Long}    columnNumber   出错代码的列号
             * @param {Object}  errorObj       错误的详细信息，Anything
             */
            window.onerror = function (errorMessage, scriptURI, lineNumber, columnNumber, errorObj) {
                logs.error({ errorMessage, scriptURI, lineNumber, columnNumber, errorObj });
            };
            vueAppInstance.config.errorHandler = function (err, vm, info) {
                logs.error(JSON.stringify({ message: "Vue errorHandler:" + err, type: info }));
            };
        }
        vueAppInstance.use(this.store);
        vueAppInstance.use(ElementPlus, { locale: zhCn });
        if (this.router) {
            vueAppInstance.use(this.router);
        }
        // 注册全局指令
        Object.keys(directives).forEach(key => {
            vueAppInstance.directive(key, directives[key]);
        });
        // 注册全局插件
        plugins(vueAppInstance);
        // 注册全局组件
        components(vueAppInstance);
        return vueAppInstance;
    }

    // 挂载dom
    mount(container) {
        this.vueAppInstance.mount(typeof container === "string" ? container : container.querySelector("#app"));
    }

    // 卸载组件实例
    unmount() {
        this.vueAppInstance.unmount();
    }
}

/**
 * 站点初始化函数
 * @param vueApp vue实例
 * @param vue相关插件 比如：routers
 * @param title 页面标题
 */
export default function (vueApp, { routers = null, userPermission = true } = {}, title) {
    // 初始化APP
    const appMain = new AppMain(routers);
    appMain.init(vueApp, userPermission);

    if (config.isDebug) {
        // 调试模式加全局模式
        window.appMain = appMain;
    }

    if (title) {
        document.title = title;
    }
    return appMain;
}

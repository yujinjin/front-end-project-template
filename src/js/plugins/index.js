/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2022-10-20 16:23:30
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2022-10-20 16:23:39
 * @项目的路径: \360-manager-H5\src\plugins\index.js
 * @描述: 系统自定义插件入口
 */

import loading from "./loading";

export default function (vueAppInstance) {
    // Loading 全局插件引入
    vueAppInstance.use(function (app) {
        app.config.globalProperties.$showLoading = loading.show;
        app.config.globalProperties.$hideLoading = loading.hide;
    });
}

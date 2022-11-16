/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2022-10-24 10:10:59
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2022-10-27 15:46:41
 * @项目的路径: \360-manager-H5\src\js\components\index.js
 * @描述: 系统自定义全局组件入口
 */

import helloWord from "./hello-world";
import searchForm from "./search-form";
import actionBar from "./action-bar";
import dataTable from "./data-table";
import searchPage from "./search-page";

export default function (vueAppInstance) {
    vueAppInstance.component("hello-world", helloWord);
    vueAppInstance.component("search-form", searchForm);
    vueAppInstance.component("action-bar", actionBar);
    vueAppInstance.component("data-table", dataTable);
    vueAppInstance.component("search-page", searchPage);
}

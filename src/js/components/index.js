/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2022-10-24 10:10:59
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2023-01-05 14:12:46
 * @项目的路径: \jfe-demo\src\js\components\index.js
 * @描述: 系统自定义全局组件入口
 */

import imgUpload from "./img-upload";
import webEditor from "./web-editor";
import inputForm from "./input-form";
import searchForm from "./search-form";
import actionBar from "./action-bar";
import dataTable from "./data-table";
import searchPage from "./search-page";
import dialogForm from "./dialog-form";

export default function (vueAppInstance) {
    vueAppInstance.component("img-upload", imgUpload);
    vueAppInstance.component("web-editor", webEditor);
    vueAppInstance.component("input-form", inputForm);
    vueAppInstance.component("search-form", searchForm);
    vueAppInstance.component("action-bar", actionBar);
    vueAppInstance.component("data-table", dataTable);
    vueAppInstance.component("search-page", searchPage);
    vueAppInstance.component("dialog-form", dialogForm);
}

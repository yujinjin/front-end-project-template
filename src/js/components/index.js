/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2022-10-24 10:10:59
 * @描述: 系统自定义全局组件入口
 */

import imgUpload from "./img-upload";
import webEditor from "./web-editor";
import searchField from "./search-field";
import inputField from "./input-field";
import inputForm from "./input-form";
import searchForm from "./search-form";
import actionBar from "./action-bar";
import dataTable from "./data-table";
import searchPage from "./search-page";
import dialogForm from "./dialog-form";

export default function (vueAppInstance) {
    vueAppInstance.component("ImgUpload", imgUpload);
    vueAppInstance.component("WebEditor", webEditor);
    vueAppInstance.component("SearchField", searchField);
    vueAppInstance.component("InputField", inputField);
    vueAppInstance.component("InputForm", inputForm);
    vueAppInstance.component("SearchForm", searchForm);
    vueAppInstance.component("ActionBar", actionBar);
    vueAppInstance.component("DataTable", dataTable);
    vueAppInstance.component("SearchPage", searchPage);
    vueAppInstance.component("DialogForm", dialogForm);
}

/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2022-10-24 10:10:59
 * @描述: 系统自定义全局组件入口
 */

import imgUpload from "./img-upload.vue";
import webEditor from "./web-editor.vue";
import searchField from "./search-field.vue";
import inputField from "./input-field.vue";
import inputForm from "./input-form.vue";
import searchForm from "./search-form.vue";
import actionBar from "./action-bar.vue";
import dataTable from "./data-table.vue";
import searchPage from "./search-page.vue";
import dialogForm from "./dialog-form.vue";

export default function (vueAppInstance) {
    vueAppInstance.component("img-upload", imgUpload);
    vueAppInstance.component("web-editor", webEditor);
    vueAppInstance.component("search-field", searchField);
    vueAppInstance.component("input-field", inputField);
    vueAppInstance.component("input-form", inputForm);
    vueAppInstance.component("search-form", searchForm);
    vueAppInstance.component("action-bar", actionBar);
    vueAppInstance.component("data-table", dataTable);
    vueAppInstance.component("search-page", searchPage);
    vueAppInstance.component("dialog-form", dialogForm);
}

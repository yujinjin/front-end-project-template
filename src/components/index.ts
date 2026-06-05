/*
 * @创建者: yujinjin9@126.com
 * @描述: 组件组件列表
 */
import { type App } from "vue";
import SvgIcon from "./svg-icon";
import CheckSelect from "./check-select";
import ImgUpload from "./img-upload";
import WebEditor from "./web-editor";
import InputField from "./input-field";
import SearchField from "./search-field";
import ActionBar from "./action-bar";
import DataTable from "./data-table";
import InputForm from "./input-form";
import SearchForm from "./search-form";
import DialogForm from "./dialog-form";
import SearchPage from "./search-page";

export * from "./svg-icon";
export * from "./check-select";
export * from "./img-upload";
export * from "./web-editor";
export * from "./input-field";
export * from "./search-field";
export * from "./action-bar";
export * from "./data-table";
export * from "./input-form";
export * from "./search-form";
export * from "./dialog-form";
export * from "./search-page";

export default {
    install: function (vueAppInstance: App, options?: Record<string, any>) {
        vueAppInstance.component(SvgIcon.name!, SvgIcon);
        vueAppInstance.component(CheckSelect.name!, CheckSelect);
        vueAppInstance.component(ImgUpload.name!, ImgUpload);
        vueAppInstance.component(WebEditor.name!, WebEditor);
        vueAppInstance.component(InputField.name!, InputField);
        vueAppInstance.component(SearchField.name!, SearchField);
        vueAppInstance.component(ActionBar.name!, ActionBar);
        vueAppInstance.component(DataTable.name!, DataTable);
        vueAppInstance.component(InputForm.name!, InputForm);
        vueAppInstance.component(SearchForm.name!, SearchForm);
        vueAppInstance.component(DialogForm.name!, DialogForm);
        vueAppInstance.component(SearchPage.name!, SearchPage);
    }
};

<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2022-10-24 10:31:46
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2022-11-08 17:32:44
 * @项目的路径: \360-manager-H5\src\pages\common-demo\index.vue
 * @描述: 常用页演示
-->
<template>
    <search-page v-bind="searchConfigData" @searchValueChange="searchValueChangeHandle" @selectRowsChangeInActionBar="selectRowsChangeInActionBarHandle" @searchFormFieldsChange="searchFormFieldsChangeHandle">
        <template #dataTable_showPlanCodeName="scope">
            <span class="plan-name-text">{{ scope.row.showPlanCodeName || "-" }}</span>
        </template>
    </search-page>
</template>

<script setup>
// import { ref, reactive } from "vue";
import searchConfig from "./search-config";
import demoAPI from "@js/api/demo";

// 所有的资源位数据
let elementList = [];

// 产品列表
let productList = [];

// 活动归属列表
let activities = [];

// 搜索表单中的产品列表选择的索引
let searchPoductIndex = 0;

// 搜索表单字段列表
let searcFormFields = null;

const queryConfigData = async function () {
    const configData = await demoAPI.queryConfigData({ eleSourceTypeState: null });
    elementList = configData.elements || [];
    productList = elementList.map(item => ({ value: item.code, label: item.name }));
    activities = [{ name: "全部", code: "" }, ...configData.activities];
    initSearchFormSelectOptions();
};

// 搜索表单的中值变化
const searchValueChangeHandle = function (field, formFields) {
    if (field.name === "productValue") {
        searchPoductIndex = productList.findIndex(item => item.value === field.value);
        formFields[1].value = null;
        formFields[1].data = searcFormFields[1].data = [{ name: "全部", code: "" }, ...elementList[searchPoductIndex].serviceModules];
        formFields[3].value = null;
        searcFormFields[3].data = [{ name: "全部", code: "" }, ...elementList[searchPoductIndex].eleSourceTypeBos];
    } else if (field.name === "serviceModuleValue") {
        formFields[3].value = null;
        if (field.value) {
            searcFormFields[3].data = [{ name: "全部", typeCode: "" }, ...elementList[searchPoductIndex].eleSourceTypeBos.filter(item => item.serviceModule === field.value)];
        } else {
            searcFormFields[3].data = [{ name: "全部", typeCode: "" }, ...elementList[searchPoductIndex].eleSourceTypeBos];
        }
    }
};

// 在action bar 组件中监控selectRows的数据变化
const selectRowsChangeInActionBarHandle = function (selectRows, actionButtons) {
    const isDisabled = selectRows.length === 0;
    actionButtons[0].props.disabled = isDisabled;
    actionButtons[1].props.disabled = isDisabled;
    actionButtons[2].props.disabled = isDisabled;
};

// 搜索表单中的字段列表变化
const searchFormFieldsChangeHandle = function (searchFormValue, formFields) {
    searcFormFields = formFields;
    initSearchFormSelectOptions();
};

// 初始化搜索表单的下拉选项
const initSearchFormSelectOptions = function () {
    if (!searcFormFields || searcFormFields.length === 0 || productList.length === 0) {
        return;
    }
    searcFormFields[0].data = productList;
    searcFormFields[4].data = activities;
    if (searcFormFields[0].value) {
        searchPoductIndex = productList.findIndex(item => item.value === searcFormFields[0].value);
    }
    if (searchPoductIndex >= 0) {
        searcFormFields[1].data = [{ name: "全部", code: "" }, ...elementList[searchPoductIndex].serviceModules];
    }
    if (!searcFormFields[1].value && !searcFormFields[2].value) {
        searcFormFields[3].data = [{ name: "全部", typeCode: "" }, ...elementList[searchPoductIndex].eleSourceTypeBos];
    } else {
        searcFormFields[3].data = [{ name: "全部", typeCode: "" }, ...elementList[searchPoductIndex].eleSourceTypeBos.filter(item => item.serviceModule === searcFormFields[1].value)];
    }
};

// 批量提交操作
const batchSubmitHandle = function (selectRows) {
    console.info(">>>>>>>>>>", selectRows);
};

// 批量撤回操作
const batchCancelHandle = function (selectRows) {
    console.info(">>>>>>>>>>", selectRows);
};

// 批量授权
const batchAuthHandle = function (selectRows) {
    console.info(">>>>>>>>>>", selectRows);
};

// 导出表格
const downloadDataHandle = function () {
    console.info(">>>>>>>>>>downloadDataHandle");
};

// 新建计划
const gotoPlanPage = function (row, button) {
    console.info(">>>>>>>>>>downloadDataHandle", row, button);
};

// 提交
const submitHandle = function (row) {
    console.info(">>>>>>>>>>submitHandle", row);
};

// 撤回
const cancelHandle = function (row) {
    console.info(">>>>>>>>>>cancelHandle", row);
};

// 暂停
const pauseHandle = function (row) {
    console.info(">>>>>>>>>>pauseHandle", row);
};

// 启动
const startUpHandle = function (row) {
    console.info(">>>>>>>>>>startUpHandle", row);
};

// 监控
const monitorHandle = function (row) {
    console.info(">>>>>>>>>>monitorHandle", row);
};

// 删除
const deleteHandle = function (row) {
    console.info(">>>>>>>>>>deleteHandle", row);
};

// 审核详情
const auditDetaile = function (row) {
    console.info(">>>>>>>>>>deleteHandle", row);
};

// 统一操作
const actionHandle = function (row, { handleCode }) {
    console.info(">>>>>>>>>>deleteHandle", row, handleCode);
};

// 搜索页配置数据
const searchConfigData = searchConfig({
    batchSubmitHandle,
    batchCancelHandle,
    batchAuthHandle,
    downloadDataHandle,
    gotoPlanPage,
    submitHandle,
    cancelHandle,
    pauseHandle,
    startUpHandle,
    monitorHandle,
    deleteHandle,
    auditDetaile,
    actionHandle
});

const init = function () {
    queryConfigData();
};

init();
</script>

<style lang="less" scoped>
.plan-name-text {
    text-decoration: underline;
    cursor: pointer;
}
</style>

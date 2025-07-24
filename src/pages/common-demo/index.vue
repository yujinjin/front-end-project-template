<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2022-10-24 10:31:46
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2023-01-30 11:33:05
 * @项目的路径: \front-end-project-template\src\pages\common-demo\index.vue
 * @描述: 常用页演示
-->
<template>
    <search-page v-bind="searchConfigData" @searchValueChange="searchValueChangeHandle" @selectRowsChange="selectRowsChangeHandle" ref="searchPageRef">
        <template #searchForm_showPlanCodeName="scope">
            <el-input v-model="scope.field.value" placeholder="请输入计划名称" />
        </template>
        <template #dataTable_showPlanCodeName="scope">
            <span class="plan-name-text">{{ scope.row.showPlanCodeName || "-" }}</span>
        </template>
    </search-page>
</template>

<script setup>
import { reactive, ref } from "vue";
import searchConfig from "./search-config";
import demoAPI from "@js/api/demo";

const searchPageRef = ref(null);

// 所有的资源位数据
let elementList = [];

// 产品列表
let productList = [];

// 活动归属列表
let activities = [];

// 搜索表单中的产品列表选择的索引
let searchPoductIndex = 0;

const queryConfigData = async function () {
    const configData = await demoAPI.queryConfigData({ eleSourceTypeState: null });
    elementList = configData.elements || [];
    productList = elementList.map(item => ({ value: item.code, label: item.name }));
    activities = [{ name: "全部", code: "" }, ...configData.activities];
    searchPageRef.value.changeFormFields(formFields => initSearchFormSelectOptions(formFields));
};

// 搜索表单的中值变化
const searchValueChangeHandle = function (field, formFields) {
    if (field.name === "productValue") {
        searchPoductIndex = productList.findIndex(item => item.value === field.value);
        formFields[1].value = "";
        formFields[1].data = [{ name: "全部", code: "" }, ...elementList[searchPoductIndex].serviceModules];
        formFields[3].value = "";
        formFields[3].data = [{ name: "全部", code: "" }, ...elementList[searchPoductIndex].eleSourceTypeBos];
    } else if (field.name === "serviceModuleValue") {
        formFields[3].value = null;
        if (field.value) {
            formFields[3].data = [{ name: "全部", typeCode: "" }, ...elementList[searchPoductIndex].eleSourceTypeBos.filter(item => item.serviceModule === field.value)];
        } else {
            formFields[3].data = [{ name: "全部", typeCode: "" }, ...elementList[searchPoductIndex].eleSourceTypeBos];
        }
    }
};

// 在action bar 组件中监控selectRows的数据变化
const selectRowsChangeHandle = function (selectRows) {
    const isDisabled = selectRows.length === 0;
    searchPageRef.value.changeButtons(buttons => {
        buttons[0].props.disabled = isDisabled;
        buttons[1].props.disabled = isDisabled;
        buttons[2].props.disabled = isDisabled;
    });
};

// 初始化搜索表单的下拉选项
const initSearchFormSelectOptions = function (formFields) {
    if (!formFields || formFields.length === 0 || productList.length === 0) {
        return;
    }
    formFields[0].data = productList;
    formFields[4].data = activities;
    if (formFields[0].value) {
        searchPoductIndex = productList.findIndex(item => item.value === formFields[0].value);
    }
    if (searchPoductIndex >= 0) {
        formFields[1].data = [{ name: "全部", code: "" }, ...elementList[searchPoductIndex].serviceModules];
    }
    if (!formFields[1].value && !formFields[2].value) {
        formFields[3].data = [{ name: "全部", typeCode: "" }, ...elementList[searchPoductIndex].eleSourceTypeBos];
    } else {
        formFields[3].data = [{ name: "全部", typeCode: "" }, ...elementList[searchPoductIndex].eleSourceTypeBos.filter(item => item.serviceModule === formFields[1].value)];
    }
};

// 批量提交操作
const batchSubmitHandle = function (selectRows) {
    console.info(">>>>>>>>>>batchSubmitHandle", selectRows);
};

// 批量撤回操作
const batchCancelHandle = function (selectRows) {
    console.info(">>>>>>>>>>batchCancelHandle", selectRows);
};

// 批量授权
const batchAuthHandle = function (selectRows) {
    console.info(">>>>>>>>>>batchAuthHandle", selectRows);
};

// 导出表格
const downloadDataHandle = function () {
    console.info(">>>>>>>>>>downloadDataHandle");
};

// 新建计划
const gotoPlanPage = function (row, button) {
    console.info(">>>>>>>>>>gotoPlanPage", row, button);
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
    console.info(">>>>>>>>>>auditDetaile", row);
};

// 搜索页配置数据
const searchConfigData = reactive(
    searchConfig({
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
        auditDetaile
    })
);

const init = async function () {
    await queryConfigData();
    searchConfigData.isLoadingForInit = false;
};

init();
</script>

<style lang="less" scoped>
.plan-name-text {
    text-decoration: underline;
    cursor: pointer;
}
</style>

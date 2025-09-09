<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2022-10-24 10:31:46
 * @描述: 常用页演示
-->
<template>
    <search-page v-bind="searchPageConfig" ref="searchPageRef" :is-loading-for-init="isLoadingForInit" @search-value-change="searchValueChangeHandle" @select-rows-change="selectRowsChangeHandle">
        <template #searchForm_showPlanCodeName="scope">
            <el-input v-model="scope.field.value" placeholder="请输入计划名称" />
        </template>
        <template #dataTable_showPlanCodeName="scope">
            <span class="plan-name-text">{{ scope.row.showPlanCodeName || "-" }}</span>
        </template>
        <customer-column-dialog
            :is-show="isShowCustomerColumnDialog"
            :table-columns="searchPageConfig.dataTableProps.columns"
            local-storage-key="commonDemoCustomerColumns"
            local-storage-key-version="1.0"
            @close="isShowCustomerColumnDialog = false"
            @save="saveColumnShowStatusHandle"
        />
    </search-page>
</template>

<script setup>
import { ref, nextTick } from "vue";
import { ElMessage } from "element-plus";
import demoAPI from "@js/api/demo";
import { HANDLE_CODES } from "@js/services/constants";
import customerColumnDialog from "@pages/components/customer-column-dialog.vue";
import searchConfig from "./search-config";

const searchPageRef = ref(null);

const isShowCustomerColumnDialog = ref(false);

// 所有的资源位数据
let elementList = [];

// 产品列表
let productList = [];

// 活动归属列表
let activities = [];

// 搜索表单中的产品列表选择的索引
let searchPoductIndex = 0;

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
        buttons[1].props.disabled = isDisabled;
        buttons[2].props.disabled = isDisabled;
        buttons[3].props.disabled = isDisabled;
    });
};

const actionHandle = function (selectRows, { handleCode }) {
    console.info(selectRows);
    switch (handleCode) {
        case HANDLE_CODES.CUSTOM:
            isShowCustomerColumnDialog.value = true;
            break;
        case HANDLE_CODES.BATCHSUBMIT:
            ElMessage({
                message: "你点击了”批量提交“按钮",
                type: "info"
            });
            break;
        case HANDLE_CODES.BATCHRESET:
            ElMessage({
                message: "你点击了”批量撤回“按钮",

                type: "info"
            });
            break;
        case HANDLE_CODES.BATCHAUTH:
            ElMessage({
                message: "你点击了”批量授权“按钮",

                type: "info"
            });
            break;
        case HANDLE_CODES.DOWNLOAD:
            ElMessage({
                message: "你点击了”导出表格“按钮",

                type: "info"
            });
            break;
        case HANDLE_CODES.CREATE:
            ElMessage({
                message: "你点击了”新建计划“按钮",

                type: "info"
            });
            break;
        case HANDLE_CODES.COPY:
            ElMessage({
                message: "你点击了”复制“按钮",

                type: "info"
            });
            break;
        case HANDLE_CODES.MONITOR:
            ElMessage({
                message: "你点击了”监控“按钮",

                type: "info"
            });
            break;
        case HANDLE_CODES.SEARCHEXAMINE:
            ElMessage({
                message: "你点击了”审核详情“按钮",

                type: "info"
            });
            break;
        case HANDLE_CODES.SUBMIT:
            ElMessage({
                message: "你点击了”提交“按钮",

                type: "info"
            });
            break;
        case HANDLE_CODES.UPDATE:
            ElMessage({
                message: "你点击了”编辑“按钮",
                type: "info"
            });
            break;
        case HANDLE_CODES.RESET:
            ElMessage({
                message: "你点击了”撤回“按钮",
                type: "info"
            });
            break;
        case HANDLE_CODES.PAUSE:
            ElMessage({
                message: "你点击了”暂停“按钮",
                type: "info"
            });
            break;
        case HANDLE_CODES.STARTUP:
            ElMessage({
                message: "你点击了”启动“按钮",
                type: "info"
            });
            break;
        case HANDLE_CODES.SUPPLEMENT:
            ElMessage({
                message: "你点击了”变更素材“按钮",
                type: "info"
            });
            break;
        case HANDLE_CODES.DELETE:
            ElMessage({
                message: "你点击了”删除“按钮",
                type: "info"
            });
            break;
        default:
            break;
    }
};

// 修改数据列展示状态操作
const saveColumnShowStatusHandle = async function (columnKeys) {
    if (!searchPageRef.value) {
        await nextTick();
    }
    searchPageRef.value?.updateTableColumnsShowStatus(columnKeys);
};

// 搜索页配置数据
const { searchPageConfig, isLoadingForInit } = searchConfig(actionHandle);

const init = async function () {
    await queryConfigData();
    isLoadingForInit.value = false;
};

init();
</script>

<style lang="scss" scoped>
.plan-name-text {
    text-decoration: underline;
    cursor: pointer;
}
</style>

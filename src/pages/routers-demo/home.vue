<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2022-10-24 11:18:01
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2023-01-09 18:52:34
 * @项目的路径: \jfe-demo\src\pages\routers-demo\home.vue
 * @描述: 路由页面演示
-->
<template>
    <search-page v-bind="searchConfigData" @selectRowsChange="selectRowsChangeHandle" ref="searchPageRef">
        <template #dataTable_orderNo="scope">
            <el-link @click="showDialogFormHandle(scope.row, { handleCode: HANDLE_CODES.QUERY })" type="primary">{{ scope.row.orderNo }}</el-link>
        </template>
        <info-form-dialog v-model:isShow="isShowInformDialog" @refresh="refreshHandle" :actionType="actionType" :row="selectedRow" />
    </search-page>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import searchConfig from "./search-config";
import { HANDLE_CODES } from "@js/services/constants";
import infoFormDialog from "./components/info-form-dialog";

// search page 组件
const searchPageRef = ref(null);

// 是否显示弹窗
const isShowInformDialog = ref(false);

// 当前数据操作类型
const actionType = ref(HANDLE_CODES.CREATE);

// 当前选中数据列
const selectedRow = ref(null);

// 显示表单弹窗操作
const showDialogFormHandle = function (row, { handleCode }) {
    actionType.value = handleCode;
    if (HANDLE_CODES.CREATE === handleCode) {
        selectedRow.value = null;
    } else {
        selectedRow.value = row;
    }
    isShowInformDialog.value = true;
};

// 刷新操作
const refreshHandle = function () {
    searchPageRef.value.queryDataList();
};

// 当前数据table row 选中变化操作
const selectRowsChangeHandle = function (selectRows, actionButtons) {
    actionButtons[1].props.disabled = selectRows.length === 0;
};

// 批量编辑操作
const batchUpdateHandle = function () {
    // TODO: 实现
};

// 导出操作
const downloadDataHandle = function () {
    // TODO: 实现
};

// 导入数据操作
const importDataHandle = function () {
    // TODO: 实现
};

// 搜索页配置数据
const searchConfigData = searchConfig({
    showDialogFormHandle,
    batchUpdateHandle,
    downloadDataHandle,
    importDataHandle
});

onMounted(() => {
    console.info("App onMounted");
});

onUnmounted(() => {
    console.info("App onUnmounted");
});
</script>

<style lang="less" scoped></style>

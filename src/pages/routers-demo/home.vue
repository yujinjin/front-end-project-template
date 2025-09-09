<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2022-10-24 11:18:01
 * @描述: 路由页面演示
-->
<template>
    <search-page v-bind="searchPageConfig" ref="searchPageRef" @select-rows-change="selectRowsChangeHandle">
        <template #dataTable_orderNo="scope">
            <el-link type="primary" @click="showDialogFormHandle(scope.row, { handleCode: HANDLE_CODES.QUERY })">{{ scope.row.orderNo }}</el-link>
        </template>
        <info-form-dialog v-if="isShowInfoFormDialog" :action-type="actionType" :row="selectedRow" @close="isShowInfoFormDialog = false" @refresh="refreshHandle" />
        <batch-update-dialog v-if="isShowBatchUpdateDialog" :rows="selectRows" @close="isShowBatchUpdateDialog = false" @refresh="refreshHandle" />
        <export-dialog v-if="isShowExportDialog" :table-columns="searchPageConfig.dataTableProps.columns" :export="exportHandle" @close="isShowExportDialog = false" />
        <import-dialog
            v-if="isShowImportDialog"
            :template-file-url="`${publicPath}demo/学期日历.xltm`"
            :columns="importColumns"
            :upload="uploadHandle"
            :save="saveHandle"
            @close="isShowImportDialog = false"
        />
    </search-page>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { HANDLE_CODES } from "@js/services/constants";
import exportDialog from "@pages/components/export-dialog.vue";
import importDialog from "@pages/components/import-dialog.vue";
import demoApi from "@js/api/demo";
import { sleep } from "@js/utils/others";
import logs from "@js/services/logs";
import batchUpdateDialog from "./components/batch-update-dialog.vue";
import infoFormDialog from "./components/info-form-dialog.vue";
import searchConfig from "./search-config";

// search page 组件
const searchPageRef = ref(null);

// 是否显示信息弹窗
const isShowInfoFormDialog = ref(false);

// 是否显示批量修改弹窗
const isShowBatchUpdateDialog = ref(false);

// 是否显示导出弹窗
const isShowExportDialog = ref(false);

// 是否显示导入弹窗
const isShowImportDialog = ref(false);

// 学期日历-order-import-template
// const templateFileUrl = ref(require("@assest/test/学期日历.xltm"));
// const templateFileUrl = ref(require("@assest/test/order-import-template.xltm"));
const publicPath = import.meta.env.BASE_URL;

// 当前数据操作类型
const actionType = ref(HANDLE_CODES.CREATE);

// 当前操作的数据列
const selectedRow = ref(null);

// 当前选中数据列表
const selectRows = ref(null);

// 显示表单弹窗操作
const showDialogFormHandle = function (row, { handleCode }) {
    actionType.value = handleCode;
    if (HANDLE_CODES.CREATE === handleCode) {
        selectedRow.value = null;
    } else {
        selectedRow.value = row;
    }
    isShowInfoFormDialog.value = true;
};

// 刷新操作
const refreshHandle = function () {
    searchPageRef.value.query();
};

// 当前数据table row 选中变化操作
const selectRowsChangeHandle = function (rows) {
    selectRows.value = rows;
    searchPageRef.value.changeButtons(buttons => {
        buttons[1].props.disabled = rows.length === 0;
    });
};

// 删除操作
const deleteHandle = async function (row) {
    try {
        await ElMessageBox.confirm("是否删除当前子渠道信息?", "确认提示", {
            customClass: "custom-confirm",
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning"
        });
        await demoApi.deleteOrderByOrderNo({ orderNo: row.orderNo });
        ElMessage({
            customClass: "custom-message",
            message: "操作成功",
            type: "success"
        });
        refreshHandle();
    } catch (error) {
        logs.error(error);
    }
};

// 批量编辑操作
const batchUpdateHandle = function () {
    isShowBatchUpdateDialog.value = true;
};

// 导出操作
const downloadDataHandle = function () {
    isShowExportDialog.value = true;
};

// 导入数据操作
const importDataHandle = function () {
    isShowImportDialog.value = true;
};

// 导出接口
const exportHandle = async function (selectedFields) {
    await sleep(5000);
    return demoApi.downloadOrder({ fields: selectedFields }, { isShowError: false });
};

// 上传文件操作
const uploadHandle = async function (file) {
    await sleep(2000);
    return demoApi.importFileForOrder({ file }, { isShowError: false });
};

// 保存上传文件的数据操作
const saveHandle = async function (datas) {
    await sleep(10000);
    return demoApi.importDataForOrder({ data: datas });
};

// 搜索页配置数据
const { searchPageConfig, importColumns } = searchConfig({
    showDialogFormHandle,
    deleteHandle,
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

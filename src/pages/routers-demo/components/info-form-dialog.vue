<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2023-01-06 15:44:53
 * @描述: 表单信息弹窗
-->
<template>
    <dialog-form v-bind="formConfigData" @close="emits('close')" />
</template>
<script setup>
import { ElMessage } from "element-plus";
import { HANDLE_CODES } from "@js/services/constants";
import demoApi from "@js/api/demo";
import formConfig from "./form-config";

const props = defineProps({
    actionType: {
        type: String,
        default: HANDLE_CODES.CREATE
    },
    row: {
        type: Object,
        default: () => null
    }
});

const emits = defineEmits(["close", "refresh"]);

// 保存操作
const saveHandle = async function (inputFormValue, formRef) {
    await formRef.validate();
    if (props.actionType === HANDLE_CODES.CREATE) {
        // 新增
        await demoApi.insertOrder(inputFormValue);
    } else if (props.actionType === HANDLE_CODES.UPDATE) {
        // 修改
        await demoApi.updateOrder(inputFormValue);
    } else if (props.actionType === HANDLE_CODES.COPY) {
        // 复制
        await demoApi.copyOrder(Object.assign({ fromOrderNo: props.row.orderNo }, inputFormValue));
    }
    ElMessage({
        customClass: "custom-message",
        message: "操作成功",
        type: "success"
    });
    emits("refresh");
    emits("close");
};

const formConfigData = formConfig({ actionType: props.actionType, row: props.row, saveHandle });
</script>
<style lang="scss" scoped>
:deep(.input-form) {
    width: 100%;
}
</style>

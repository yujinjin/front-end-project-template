<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2023-01-06 15:44:53
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2023-01-19 13:44:21
 * @项目的路径: \front-end-project-template\src\pages\routers-demo\components\info-form-dialog.vue
 * @描述: 表单信息弹窗
-->
<template>
    <dialog-form :isShow="isShow" v-bind="formConfigData" @close="emits('update:isShow', false)" />
</template>
<script setup>
import { ref, watch } from "vue";
import { ElMessage } from "element-plus";
import { HANDLE_CODES } from "@js/services/constants";
import formConfig from "./form-config";
import demoApi from "@js/api/demo";

const props = defineProps({
    isShow: {
        type: Boolean,
        default: false
    },
    actionType: {
        type: String,
        default: HANDLE_CODES.CREATE
    },
    row: {
        type: Object
    }
});

const emits = defineEmits(["update:isShow", "refresh"]);

// dialog form 配置数据
const formConfigData = ref({});

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
};

watch(
    () => props.isShow,
    () => {
        formConfigData.value = formConfig({ actionType: props.actionType, row: props.row, saveHandle });
    }
);
</script>
<style lang="less" scoped>
:deep(.input-form) {
    width: 100%;
}
</style>

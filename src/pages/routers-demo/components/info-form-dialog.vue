<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2023-01-06 15:44:53
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2023-01-09 17:50:40
 * @项目的路径: \jfe-demo\src\pages\routers-demo\components\info-form-dialog.vue
 * @描述: 表单信息弹窗
-->
<template>
    <dialog-form :isShow="isShow" v-bind="formConfigData" @close="emits('update:isShow', false)" />
</template>
<script setup>
import { ref, watch } from "vue";
import { HANDLE_CODES } from "@js/services/constants";
import formConfig from "./form-config";
// import { Router, useRouter } from "vue-router";
// import { dataStore } from "@js/stores/";
// 全局路由对象
// const router: Router = useRouter();
// vuex
// const store = dataStore();

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
const saveHandle = function (inputFormValue) {
    console.info(inputFormValue);
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

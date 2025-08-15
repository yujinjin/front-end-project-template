<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2023-01-29 18:33:18
 * @描述: 批量修改弹窗
-->
<template>
    <dialog-form v-bind="formConfigData" @close="emits('close')" />
</template>
<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { ORDER_STATUS } from "@js/services/constants";
import demoApi from "@js/api/demo";

const props = defineProps({
    rows: {
        type: Object
    }
});

const emits = defineEmits(["close", "refresh"]);

// 保存操作
const saveHandle = async function (inputFormValue, formRef) {
    await formRef.validate();
    await demoApi.batchUpdateOrder({ orderNos: props.rows.map(row => row.orderNo), ...inputFormValue });
    ElMessage({
        customClass: "custom-message",
        message: "操作成功",
        type: "success"
    });
    emits("refresh");
    emits("close");
};

// dialog form 配置数据
const formConfigData = ref({
    dialogProps: {
        title: "批量修改"
    },
    buttons: [
        {
            text: "取消"
        },
        {
            text: "保存",
            click: saveHandle,
            props: {
                type: "primary"
            }
        }
    ],
    inputFormProps: {
        fields: [
            {
                type: "select",
                label: "订单状态",
                name: "orderStatus",
                data: ORDER_STATUS.map(item => ({ label: item.name, value: item.value })),
                rules: [
                    {
                        required: true,
                        message: "请选择订单状态",
                        trigger: "blur"
                    }
                ]
            },
            {
                type: "webEditor",
                label: "备注",
                name: "remark",
                rules: [
                    {
                        required: true,
                        message: "请输入备注",
                        trigger: "blur"
                    }
                ]
            }
        ]
    }
});
</script>

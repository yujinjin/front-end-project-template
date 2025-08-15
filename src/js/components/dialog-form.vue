<template>
    <el-dialog v-if="isShow" v-model="dialogVisible" v-bind="dialogInnerProps" class="dialog-form" @closed="dialogClosed">
        <input-form v-bind="inputFormProps" @fieldValueChange="inputFormFieldValueChange" ref="inputFormRef">
            <template v-for="name in Object.keys(slots)" #[name]="scope">
                <slot :name="name" v-bind="scope"></slot>
            </template>
        </input-form>
        <template #footer>
            <div class="dialog-footer">
                <template v-for="(button, index) in actionButtons">
                    <slot v-if="button.slot" :name="button.slot" :button="button"></slot>
                    <el-button v-else :key="index" v-bind="button.props" @click="clickHandle(button)" :loading="button.isLoading">
                        <template v-if="button.icon">
                            <i v-if="typeof button.icon === 'string'" :class="[button.icon]"></i>
                            <el-icon v-else><component :is="button.icon" /></el-icon>
                        </template>
                        {{ button.text }}
                    </el-button>
                </template>
            </div>
        </template>
    </el-dialog>
</template>
<script setup>
import { useSlots, ref, watch } from "vue";

const props = defineProps({
    isShow: {
        type: Boolean,
        default: true
    },
    dialogProps: {
        type: Object
    },
    buttons: {
        type: Array
    },
    inputFormProps: {
        type: Object
    }
});

const emits = defineEmits(["fieldValueChange", "close"]);

// 弹窗显示状态
const dialogVisible = ref(true);

const slots = useSlots();

const inputFormRef = ref(null);

// 弹窗内部属性
const dialogInnerProps = ref(
    Object.assign(
        {
            closeOnClickModal: false,
            appendToBody: true,
            alignCenter: true,
            destroyOnClose: true,
            width: "750px"
        },
        props.dialogProps
    )
);

// 实际数据列中的操作按钮列表
// isLoading: 当前按钮是否正在加载
// handleCode: 用户操作CODE
// text: 按钮操作文案
// click: 按钮点击事件
const actionButtons = ref([]);

// 初始化操作按钮列表
const initActionButtons = function () {
    if (!props.buttons || props.buttons.length === 0) {
        return;
    }
    actionButtons.value = [];
    props.buttons.forEach(button => {
        if (button.isShow !== false) {
            button = Object.assign({ isLoading: false }, button);
            button.props = Object.assign({}, button.props);
            actionButtons.value.push(button);
        }
    });
};

// 弹窗关闭
const dialogClosed = function () {
    emits("close");
};

const inputFormFieldValueChange = function (field, fieldValue, formFields) {
    emits("fieldValueChange", field, fieldValue, formFields);
};

// 按钮点击操作
const clickHandle = async function (button) {
    if (button.isLoading) {
        return;
    }
    button.isLoading = true;
    let canColse = true;
    try {
        if (button.click) {
            canColse = await button.click(inputFormRef.value.getInputValue(), inputFormRef.value.getFormRef(), button);
        }
    } catch (error) {
        canColse = false;
        logs.error(error);
    }
    button.isLoading = false;
    if (canColse !== false) {
        dialogVisible.value = false;
    }
};

watch(
    () => props.buttons,
    () => {
        initActionButtons();
    },
    { deep: true, immediate: true }
);

defineExpose({
    // 获取表单的value
    getInputValue: function () {
        return inputFormRef.value?.getInputValue();
    },
    // 修改当前form字段的属性
    changeFormFields: function (callback) {
        return inputFormRef.value?.changeFormFields(callback);
    },
    // 修改当前生成的button按钮值
    changeButtons: function (callback) {
        if (callback && typeof callback === "function") {
            callback(actionButtons.value);
        } else {
            logs.warn("callback 必须是一个函数");
        }
    },
    // 获取form Ref
    getFormRef: function () {
        return inputFormRef.value?.getFormRef();
    }
});
</script>

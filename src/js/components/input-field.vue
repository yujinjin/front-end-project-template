<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2023-01-30 11:39:10
 * @描述: 输入表单字段
-->
<template>
    <!-- 自定义插件，插槽 -->
    <slot v-if="field.slot"></slot>

    <!-- 标签内容 -->
    <div v-else-if="field.type === 'label'" class="label-contents">{{ modelValue }}</div>

    <!-- 图片上传 -->
    <img-upload v-else-if="field.type === 'imgUpload'" :model-value="modelValue" v-bind="field.props || {}" @update:model-value="value => changeValue(value.trim())" />

    <!-- 富文本框 -->
    <web-editor v-else-if="field.type === 'webEditor'" :model-value="modelValue" v-bind="field.props || {}" @update:model-value="value => changeValue(value)" />

    <!-- select -->
    <el-select v-else-if="field.type === 'select'" :model-value="modelValue" v-bind="field.props || {}" @update:model-value="value => changeValue(value)" v-on="field.events || {}">
        <el-option
            v-for="(item, index) in field.data"
            :key="(item[field.optionValueKey || 'value'] || '') + '_' + index"
            :label="item[field.optionLabelKey || 'label']"
            :value="item[field.optionValueKey || 'value']"
            :disabled="item.disabled === true"
        />
    </el-select>

    <!-- checkbox -->
    <el-checkbox-group v-else-if="field.type === 'checkbox'" :model-value="modelValue" v-bind="field.props || {}" @update:model-value="value => changeValue(value)" v-on="field.events || {}">
        <el-checkbox
            v-for="(item, index) in field.data"
            :key="(item[field.optionValueKey || 'value'] || '') + '_' + index"
            :label="item[field.optionValueKey || 'value']"
            :disabled="item.disabled === true"
        >
            {{ item[field.optionLabelKey || "label"] }}
        </el-checkbox>
    </el-checkbox-group>

    <!-- radio -->
    <el-radio-group v-else-if="field.type === 'radio'" :model-value="modelValue" v-bind="field.props || {}" @update:model-value="value => changeValue(value)" v-on="field.events || {}">
        <el-radio-button
            v-for="(item, index) in field.data"
            :key="(item[field.optionValueKey || 'value'] || '') + '_' + index"
            :label="item[field.optionValueKey || 'value']"
            :disabled="item.disabled === true"
        >
            {{ item[field.optionLabelKey || "label"] }}
        </el-radio-button>
    </el-radio-group>
    <!-- element 组件 -->
    <component :is="getElComponentName(field)" v-else :model-value="modelValue" v-bind="field.props || {}" @update:model-value="value => changeValue(value)" v-on="field.events || {}" />
</template>
<script setup>
defineProps({
    modelValue: {
        type: [String, Number, Object],
        default() {
            return null;
        }
    },
    field: {
        type: Object,
        required: true
    }
});

const emits = defineEmits(["update:modelValue"]);

// 获取elment 组件名称
const getElComponentName = function (field) {
    return "el-" + field.type.replace(/([A-Z])/g, "-$1").toLowerCase();
};

const changeValue = function (value) {
    emits("update:modelValue", value);
};
</script>

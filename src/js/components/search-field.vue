<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2023-01-30 11:02:23
 * @描述: 搜索表单字段
-->
<template>
    <div class="input-box">
        <!-- 自定义插件，插槽 -->
        <slot></slot>
        <template v-if="!field.slot && field.type">
            <!-- input -->
            <el-input
                v-if="field.type === 'input'"
                :modelValue="field.value"
                @update:modelValue="value => changeValue(value.trim())"
                @change="changeHandle"
                v-bind="field.props || {}"
                v-on="field.events || {}"
            />

            <!-- input-number -->
            <el-input-number
                v-else-if="field.type === 'inputNumber'"
                :modelValue="field.value"
                @update:modelValue="changeValue"
                @change="changeHandle"
                v-bind="field.props || {}"
                v-on="field.events || {}"
            />

            <!-- select -->
            <el-select v-else-if="field.type === 'select'" :modelValue="field.value" @update:modelValue="changeValue" @change="changeHandle" v-bind="field.props || {}" v-on="field.events || {}">
                <el-option
                    v-for="(item, index) in field.data"
                    :key="(item[field.optionValueKey || 'value'] || '') + '_' + index"
                    :label="item[field.optionLabelKey || 'label']"
                    :value="item[field.optionValueKey || 'value']"
                    :disabled="item.disabled === true"
                />
            </el-select>

            <!-- date-picker -->
            <el-date-picker
                v-else-if="field.type === 'datePicker'"
                :modelValue="field.value"
                @update:modelValue="changeValue"
                @change="changeHandle"
                v-bind="field.props || {}"
                v-on="field.events || {}"
            />
        </template>
    </div>
</template>
<script setup>
const props = defineProps({
    field: {
        type: Object,
        required: true
    }
});

const emits = defineEmits(["update:modelValue", "change"]);

const changeValue = function (value) {
    emits("update:modelValue", value);
};

const changeHandle = function () {
    emits("change", props.field);
};
</script>

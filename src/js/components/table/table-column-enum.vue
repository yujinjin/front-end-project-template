<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2022-10-24 10:31:46
 * @描述: 组件模板页
-->
<template>
    <div class="table-column-enum">{{ enumText }}</div>
</template>
<script setup>
import { computed } from "vue";

const props = defineProps({
    value: {
        type: [String, Number, Boolean],
        default() {
            return null;
        }
    },
    data: {
        type: Array,
        // default: function () {
        //     return [];
        // },
        required: true
    },
    // 分隔符，value值用','隔开时
    separator: {
        type: String,
        default: ","
    },
    valueKey: {
        type: String,
        default: "value"
    },
    textKey: {
        type: String,
        default: "label"
    }
});

const enumText = computed(() => {
    if (typeof props.value === "number" || typeof props.value === "boolean") {
        const findItem = props.data.find(dateItem => dateItem[props.valueKey] === props.value);
        return findItem ? findItem[props.textKey] : props.value;
    }
    if (!props.value) {
        return "-";
    }
    return props.value
        .split(props.separator)
        .map(item => {
            if (!item) {
                return "";
            }
            const findItem = props.data.find(dateItem => dateItem[props.valueKey] === item);
            if (findItem) {
                return findItem[props.textKey];
            }
            return item;
        })
        .join(props.separator);
});
</script>
<style lang="scss" scoped>
.table-column-enum {
}
</style>

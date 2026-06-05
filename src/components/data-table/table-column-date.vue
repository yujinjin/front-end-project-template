<!--
 * @创建者: yujinjin9@126.com
 * @描述: 日期格式化数据列
-->
<template>
    <div class="cms-table-column-date">{{ dateText }}</div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { dateFormat } from "@/utils/index";

defineOptions({
    name: "table-column-date"
});

const props = defineProps({
    // 日期值
    value: {
        type: [String, Number, Array],
        default: null
    },
    // 日期格式化字符串
    formate: {
        type: String,
        default: "YYYY-MM-DD"
    },
    // 分隔符，value是数组时时用到
    separator: {
        type: String,
        default: " ~ "
    }
});

const dateText = computed(() => {
    if (!props.value) {
        return "-";
    }
    if (Object.prototype.toString.call(props.value) === "[object Array]") {
        if ((props.value as Array<any>).length === 0) {
            return "-";
        }
        return (props.value as Array<any>).map(item => (item ? dateFormat(item, props.formate) : "")).join(props.separator);
    }
    return props.value ? dateFormat(props.value as number | string, props.formate) : "-";
});
</script>

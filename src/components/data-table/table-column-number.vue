<!--
 * @创建者: yujinjin9@126.com
 * @描述: 数字数据列
-->
<template>
    <div class="cms-table-column-number">{{ numberText }}</div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { numberFormat } from "@/utils/index";

defineOptions({
    name: "table-column-number"
});

const props = defineProps({
    // 日期值
    value: {
        type: [String, Number],
        default: null
    },
    // 日期格式化字符串
    digit: {
        type: Number,
        default: 0
    }
});

const numberText = computed(() => {
    if (props.value === null || props.value === undefined || String(props.value).trim() === "") {
        return "-";
    }
    return numberFormat(props.value, props.digit);
});
</script>

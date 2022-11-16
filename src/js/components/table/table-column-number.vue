<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2022-10-24 10:31:46
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2022-10-26 17:56:39
 * @项目的路径: \360-manager-H5\src\js\components\table\table-column-number.vue
 * @描述: 数字格式化数据列
-->
<template>
    <div class="table-column-number">{{ numberText }}</div>
</template>
<script setup>
import { computed, defineProps } from "vue";
import { numberFormat } from "@js/utils/format";

const props = defineProps({
    // 日期值
    value: {
        type: [String, Number]
    },
    // 日期格式化字符串
    digit: {
        type: Number,
        default: 0
    }
});

const numberText = computed(() => {
    if (props.value === null || props.value === undefined) {
        return "-";
    }
    return numberFormat(props.value, props.digit);
});
</script>
<style lang="less" scoped>
.table-column-number {
}
</style>

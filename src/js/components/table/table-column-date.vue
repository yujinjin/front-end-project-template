<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2022-10-24 10:31:46
 * @描述: 日期格式化数据列
-->
<template>
    <div class="table-column-date">{{ dateText }}</div>
</template>
<script setup>
import { computed } from "vue";
import { dateFormat } from "@js/utils/format";

const props = defineProps({
    // 日期值
    value: {
        type: [String, Number, Array],
        default() {
            return null;
        }
    },
    // 日期格式化字符串
    formate: {
        type: String,
        default: "YYYY-MM-DD"
    },
    // 分隔符，多个value时用到
    separator: {
        type: String,
        default: "-"
    }
});

const dateText = computed(() => {
    if (!props.value) {
        return "-";
    }
    if (Object.prototype.toString.call(props.value) === "[object Array]") {
        return props.value.map(item => (item ? dateFormat(item, props.formate) : "")).join(props.separator);
    }
    return props.value ? dateFormat(props.value, props.formate) : "-";
});
</script>
<style lang="scss" scoped>
.table-column-date {
}
</style>

<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2023-01-29 10:01:53
 * @描述: 等待进度条加载动画
-->
<template>
    <div class="wait-progress">
        <el-progress :text-inside="true" :stroke-width="26" :percentage="progress.percentage" />
        <slot>
            <div class="state-text">正在处理数据，请稍后...</div>
        </slot>
    </div>
</template>
<script setup>
import { onMounted, onUnmounted, reactive } from "vue";

const props = defineProps({
    // 当前数据是否处理完成
    finished: {
        type: Boolean,
        default: false
    },
    // 执行间隔时间
    intervalTime: {
        type: Number,
        default: 500
    },
    // 每次增长速度
    speed: {
        type: Number,
        default: 0.1
    }
});

const emits = defineEmits(["update:finished"]);

// 精度
const progress = reactive({
    timoutId: null,
    times: 0,
    percentage: 0
});

// 销毁
const destroyed = function () {
    if (progress.timoutId) {
        clearInterval(progress.timoutId);
        progress.timoutId = null;
    }
    progress.times = 0;
    progress.percentage = 0;
};

// 处理动画
const progressAnimation = function () {
    let ratio = props.speed;
    let percentage = progress.percentage;
    progress.timoutId = setInterval(() => {
        ++progress.times;
        if (progress.percentage >= 100) {
            clearInterval(progress.timoutId);
            progress.percentage = 101;
            progress.timoutId = null;
            return;
        }
        if (progress.percentage > 95 && props.finished) {
            progress.percentage = 100;
            return;
        }
        if (props.finished) {
            ratio = 1;
        } else if (progress.percentage === 99) {
            // 到99 不可能再增加了
            return;
        } else if (progress.percentage > 90) {
            ratio = 0.1;
        } else if (progress.percentage > 80) {
            ratio = 0.2;
        } else {
            ratio = props.speed * (progress.times % 10);
        }
        percentage = percentage + (99 - progress.percentage) * ratio * Math.random();

        progress.percentage = parseInt(percentage, 10);
    }, props.intervalTime);
};

defineExpose({
    start: function () {
        if (props.finished) {
            emits("update:finished", false);
        }
        destroyed();
        progressAnimation();
    }
});

onMounted(() => {
    if (!props.finished) {
        progressAnimation();
    }
});

onUnmounted(() => {
    destroyed();
});
</script>
<style lang="scss" scoped>
.wait-progress {
    width: 100%;
    text-align: center;

    .state-text {
        line-height: 20px;
        text-align: center;
        padding-top: 10px;
        font-size: 12px;
        span {
            font-size: 15px;
            display: inline-block;
            padding: 0px 2px;
            color: #f56c6c;
            font-weight: bold;
        }
    }
}
</style>

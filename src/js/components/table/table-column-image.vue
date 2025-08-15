<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2022-10-24 10:31:46
 * @描述: 组件模板页
-->
<template>
    <div class="table-column-img">
        <div class="no-image" v-if="!previewImgList || previewImgList.length === 0">没有图片</div>
        <el-image v-else v-for="(img, index) in previewImgList" :key="img + '_' + index" :src="img" :preview-src-list="previewImgList" :initial-index="index" fit="contain" :preview-teleported="true">
            <template #error>
                <div class="error-box">
                    <el-icon><Picture /></el-icon>
                </div>
            </template>
        </el-image>
        <!-- <el-image v-else-if="previewImgList.length === 1" :src="previewImgList[0]" :preview-src-list="previewImgList" fit="contain" :preview-teleported="true">
            <template #error>
                <div class="error-box">
                    <el-icon><Picture /></el-icon>
                </div>
            </template>
        </el-image> -->
        <!-- <el-carousel v-else :autoplay="false" type="card" height="40px" indicator-position="none" arrow="never">
            <el-carousel-item v-for="(img, index) in previewImgList" :key="img + '_' + index">
                <el-image :src="img" fit="contain">
                    <template #error>
                        <div class="error-box">
                            <el-icon><Picture /></el-icon>
                        </div>
                    </template>
                </el-image>
            </el-carousel-item>
        </el-carousel> -->
    </div>
</template>
<script setup>
import { computed } from "vue";
import { Picture } from "@element-plus/icons-vue";

// TODO: 支持SVGA 图片格式
const props = defineProps({
    value: {
        type: [String, Array]
    },
    // value 是string,分隔符传值才有效
    separator: {
        type: String
    }
});

// 图片预览列表
const previewImgList = computed(() => {
    if (!props.value) return null;
    if (Array.isArray(props.value)) {
        return props.value;
    } else {
        return props.separator ? props.value.split(props.separator) : [props.value];
    }
});
</script>
<style lang="scss" scoped>
.table-column-img {
    height: 50px;
    display: flex;
    overflow: hidden;
    width: 100%;
    .no-image {
        height: 50px;
        width: 60px;
        border-radius: 4px;
        background: #f5f7fa;
        color: #909399;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
    }

    .el-image {
        height: 50px;
        flex-shrink: 0;

        &:not(:first-child) {
            margin-left: 4px;
        }
    }
}
</style>

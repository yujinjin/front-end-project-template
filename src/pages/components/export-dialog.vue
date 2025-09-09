<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2023-01-19 15:05:28
 * @描述: 导出弹窗业务组件
-->
<template>
    <customer-column-dialog :is-show="loadType === 0 && isShow" :table-columns="tableColumns" @close="loadType === 0 && emits('close')" @save="submitHandle" />
    <el-dialog
        v-if="isShow && [1, 2, 3].includes(loadType)"
        v-model="dialogVisible"
        :close-on-click-modal="false"
        width="636px"
        class="export-dialog custom-dialog"
        :title="title || '数据导出'"
        @closed="emits('close')"
    >
        <!-- 导入中 -->
        <wait-progress v-if="loadType == 1" class="exporting-box">
            <div class="state-text">正在批量导出数据，请稍后...</div>
        </wait-progress>
        <!-- 导入成功 -->
        <el-result v-else-if="loadType == 2" icon="success" title="批量导出完成">
            <template #extra>
                <el-button size="default" type="primary" @click="downFileHandle">
                    <el-icon><Download /></el-icon>
                    下载导出的文件
                </el-button>
            </template>
        </el-result>
        <!-- 导入失败 -->
        <el-result v-else-if="loadType == 3" icon="error" title="导出失败了" :sub-title="errorMessage" />
        <template v-if="loadType !== 1" #footer>
            <div class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button v-if="loadType == 2 || loadType == 3" type="primary" @click="init">重新导出</el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script setup>
import { ref } from "vue";
import { Download } from "@element-plus/icons-vue";
import commonApi from "@js/api/common";
import customerColumnDialog from "@pages/components/customer-column-dialog.vue";
import waitProgress from "./wait-progress.vue";

const props = defineProps({
    isShow: {
        type: Boolean,
        default: true
    },
    // 弹窗标题
    title: {
        type: String,
        default: () => null
    },
    // 导出函数
    export: {
        type: Function,
        required: true
    },
    // 导入的全部字段
    tableColumns: {
        type: Array,
        default() {
            return [];
        },
        required: true
    }
});

const emits = defineEmits(["close"]);

// 当前加载类型，0：初始化状态，1: 正在导出，2: 导出成功，3：导出失败
const loadType = ref(0);

// 弹窗显示状态
const dialogVisible = ref(true);

// 导出的文件地址URL
const exportFileUrl = ref("");

// 错误消息提示
const errorMessage = ref("");

// 下载文件操作
const downFileHandle = function () {
    commonApi.download({
        type: "a",
        url: exportFileUrl.value
    });
};

// 重新导出
const init = function () {
    loadType.value = 0;
    exportFileUrl.value = "";
    errorMessage.value = "";
};

// 导出
const submitHandle = async function (columnKeys) {
    if (loadType.value !== 0) {
        return;
    }
    loadType.value = 1;
    try {
        exportFileUrl.value = await props.export(columnKeys);
        loadType.value = 2;
    } catch (error) {
        loadType.value = 3;
        errorMessage.value = error.msg;
    }
};

init();
</script>
<style lang="scss">
.el-dialog.export-dialog {
    .el-dialog__body {
        min-height: 350px;

        .exporting-box {
            padding: 150px 50px;
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
    }
}
</style>

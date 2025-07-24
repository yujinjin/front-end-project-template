<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2023-01-19 15:05:28
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2023-02-03 11:23:18
 * @项目的路径: \front-end-project-template\src\pages\components\export-dialog.vue
 * @描述: 导出弹窗业务组件
-->
<template>
    <el-dialog v-if="isShow" v-model="dialogVisible" :close-on-click-modal="false" width="636px" class="export-dialog" :title="title || '数据导出'" @closed="dialogClosed">
        <!-- 选择数据列 -->
        <div class="fields-selected-panel" v-if="loadType === 0">
            <div class="fields-select-wrapper">
                <div class="all-fields-card">
                    <div class="title-text search-input-box">
                        <el-input v-model.trim.lazy="searchText" placeholder="可搜索列名称" :suffix-icon="Search" @input="searchHandle" />
                    </div>
                    <el-empty v-if="filterFields.length === 0" :image-size="100" description="未匹配到数据" />
                    <div class="checkbox-group-table" v-else>
                        <el-checkbox v-model="checkAll" :indeterminate="checkAllIndeterminate" @change="checkAllChangeHandle">全部</el-checkbox>
                        <el-checkbox-group v-model="selectedFields" @change="initCheckAllStatusHandle">
                            <el-checkbox v-for="field in filterFields" :key="field.name" :disabled="field.disabled === true" :label="field.name">
                                {{ field.label }}
                            </el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
                <div class="selected-fields-card">
                    <div class="title-text">
                        已选({{ selectedFields.length }}/{{ filterFields.length }})
                        <span @click="clearAllHandle">清空</span>
                    </div>
                    <el-empty v-if="selectedFields.length === 0" :image-size="100" description="你还未选择任何数据" />
                    <div class="selected-fields-table" v-else>
                        <div class="selected-row" v-for="field in filterFields" :key="field.name" v-show="selectedFields.includes(field.name)">
                            <div class="label-text">{{ field.label }}</div>
                            <el-icon @click="deleteSelectedFieldHandle(field.name)"><Delete /></el-icon>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 导入中 -->
        <wait-progress class="exporting-box" v-else-if="loadType == 1">
            <div class="state-text">正在批量导出数据，请稍后...</div>
        </wait-progress>
        <!-- 导入成功 -->
        <div class="succes-box" v-else-if="loadType == 2">
            <el-button size="default" type="primary" @click="downFileHandle">
                <el-icon><Download /></el-icon>
                下载导出的文件
            </el-button>
            <div class="title-text">批量导出完成...</div>
        </div>
        <!-- 导入失败 -->
        <div class="fail-box" v-else-if="loadType == 3">
            <div class="icon-box">
                <el-icon><Warning /></el-icon>
            </div>
            <div class="fail-tips">
                <div class="title-text">异常提示</div>
                <div class="content">{{ errorMessage }}</div>
            </div>
        </div>
        <template #footer v-if="loadType !== 1">
            <div class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" :disabled="selectedFields.length === 0" v-if="loadType == 0" @click="submitHandle">确定导出</el-button>
                <el-button type="primary" v-else-if="loadType == 2 || loadType == 3" @click="init">重新导出</el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script setup>
import { ref, watch } from "vue";
import { Search, Delete, Download, Warning } from "@element-plus/icons-vue";
import waitProgress from "./wait-progress";
import commonApi from "@js/api/common";

const props = defineProps({
    isShow: {
        type: Boolean,
        default: false
    },
    title: {
        type: String
    },
    // 导出函数
    export: {
        type: Function,
        required: true
    },
    // 导入的全部字段
    fields: {
        type: Array,
        default() {
            return [];
        },
        required: true
    },
    // 默认已经选中导出的字段（string[]格式）
    selected: {
        type: Array,
        default() {
            return [];
        }
    }
});

const emits = defineEmits(["update:isShow"]);

// 当前加载类型，0：初始化状态，1: 正在导入，2: 导入成功，3：导入失败
const loadType = ref(0);

// 弹窗显示状态
const dialogVisible = ref(false);

// 搜索列的名称
const searchText = ref("");

// 过滤后的字段列表
const filterFields = ref([]);

// 选中所有字段
const checkAll = ref(true);

// 导出的文件地址URL
const exportFileUrl = ref("");

// 错误消息提示
const errorMessage = ref("");

// 当前所选的字段列表
const selectedFields = ref([]);

// 设置不确定状态，仅负责样式控制
const checkAllIndeterminate = ref(false);

// 弹窗关闭
const dialogClosed = function () {
    emits("update:isShow", false);
};

// 初始化全选状态
const initCheckAllStatusHandle = function () {
    if (selectedFields.value.length === 0 || filterFields.value.length === 0) {
        checkAllIndeterminate.value = false;
        checkAll.value = false;
    } else {
        const selected = selectedFields.value.filter(item => filterFields.value.findIndex(findItem => findItem.name === item) !== -1);
        checkAllIndeterminate.value = selected.length > 0 && selected.length < filterFields.value.length;
        checkAll.value = selected.length === filterFields.value.length;
    }
};

// 全选变化
const checkAllChangeHandle = function (value) {
    filterFields.value.forEach(item => {
        const findIndex = selectedFields.value.indexOf(item.name);
        if (value && findIndex === -1) {
            selectedFields.value.push(item.name);
        } else if (!value && findIndex !== -1) {
            selectedFields.value.splice(findIndex, 1);
        }
    });
    checkAllIndeterminate.value = false;
};

// 搜索操作
const searchHandle = function (value) {
    if (!props.fields || props.fields.length === 0) {
        filterFields.value = [];
        return;
    }
    if (value) {
        filterFields.value = props.fields.filter(item => item.label.includes(value));
    } else {
        filterFields.value = props.fields;
    }
    initCheckAllStatusHandle();
};

// 清除所有操作
const clearAllHandle = function () {
    selectedFields.value = [];
    initCheckAllStatusHandle();
};

// 删除已经选中的字段
const deleteSelectedFieldHandle = function (name) {
    selectedFields.value.splice(selectedFields.value.indexOf(name), 1);
    initCheckAllStatusHandle();
};

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
    searchText.value = "";
    searchHandle(searchText.value);
};

// 导出
const submitHandle = async function () {
    if (loadType.value !== 0) {
        return;
    }
    loadType.value = 1;
    try {
        exportFileUrl.value = await props.export(selectedFields.value);
        loadType.value = 2;
    } catch (error) {
        loadType.value = 3;
        errorMessage.value = error.msg;
    }
};

watch(
    () => props.selected,
    value => {
        if (selectedFields.value.length === 0) {
            selectedFields.value = value.map(item => item) || [];
        } else if (value.length > 0) {
            value.forEach(item => {
                if (!selectedFields.value.includes(item)) {
                    selectedFields.value.push(item);
                }
            });
        }
        searchHandle(searchText.value);
    },
    {
        deep: true
    }
);

watch(
    () => props.fields,
    () => {
        searchHandle(searchText.value);
    },
    {
        deep: true
    }
);

watch(
    () => props.isShow,
    value => {
        if (value) {
            init();
            dialogVisible.value = true;
        }
    }
);
</script>
<style lang="less">
.el-dialog.export-dialog {
    .el-dialog__body {
        padding: 12px 20px;
        min-height: 350px;

        .fields-selected-panel {
            .fields-select-wrapper {
                display: flex;

                .all-fields-card,
                .selected-fields-card {
                    // padding: 0px 16px;
                    height: 400px;
                    border: 1px solid #d9d9d9;
                    border-radius: 2px;
                    display: flex;
                    flex-direction: column;

                    .title-text {
                        height: 44px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        background: #f7f7fa;
                        padding: 0px 16px;
                        width: 100%;
                        border-bottom: 1px solid #d9d9d9;

                        span {
                            float: right;
                            cursor: pointer;
                            color: #00a64d;

                            &:hover {
                                opacity: 0.8;
                            }
                        }
                    }
                }

                .all-fields-card {
                    width: 380px;

                    .search-input-box {
                        .el-input {
                            width: 230px;
                        }
                    }

                    .checkbox-group-table {
                        flex: 1;
                        overflow-y: auto;
                        padding: 4px 16px;

                        .el-checkbox__label {
                            color: rgba(0, 0, 0, 0.65);
                            font-size: 14px;
                        }

                        .el-checkbox-group {
                            .el-checkbox {
                                width: 50%;
                                margin-right: 0px;
                            }

                            .el-checkbox__label {
                                max-width: 150px;
                                display: inline-block;
                                white-space: nowrap;
                                word-wrap: normal;
                                overflow: hidden;
                                text-overflow: ellipsis;
                            }
                        }
                    }
                }

                .selected-fields-card {
                    width: 200px;
                    margin-left: 16px;

                    .selected-fields-table {
                        padding: 0px 8px;
                        overflow-y: auto;
                        flex: 1;

                        .selected-row {
                            display: flex;
                            padding: 0 5px;
                            align-items: center;
                            height: 32px;
                            line-height: 32px;
                            font-size: 12px;
                            font-weight: 400;
                            color: rgba(0, 0, 0, 0.65);
                            cursor: default;

                            &:hover {
                                background-color: #fafafa;
                            }

                            .label-text {
                                flex: 1;
                                display: -webkit-box;
                                word-break: break-all;
                                text-overflow: ellipsis;
                                overflow: hidden;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 1;
                            }

                            .el-icon {
                                cursor: pointer;
                                margin-left: 2px;
                                &:hover {
                                    color: #00b85c;
                                }
                            }
                        }
                    }
                }
            }
        }

        .fail-box {
            display: flex;
            margin-top: 10px;
            border: 1px solid #e2e2e2;
            border-radius: 4px;
            min-height: 150px;
            .icon-box {
                width: 150px;
                display: flex;
                justify-content: center;
                align-items: center;
                border-right: 1px solid #e2e2e2;
                font-size: 50px;
                color: #e6a23c;
                background-color: #f2f2f2;
            }
            .fail-tips {
                padding: 10px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                font-size: 13px;
                line-height: 20px;
                .title-text {
                    font-weight: bold;
                }
            }
        }
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
        .succes-box {
            padding: 100px;
            text-align: center;
            .title-text {
                padding: 8px 0px;
                line-height: 30px;
            }
        }
    }

    .el-dialog__footer {
        padding: 8px 20px;
        box-shadow: 0px -1px 0px 0px #f5f5f5, 0px 1px 30px 0px rgba(0, 21, 41, 0.12);

        .el-button {
            min-width: 80px;
        }
    }
}
</style>

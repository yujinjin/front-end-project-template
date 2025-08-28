<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2023-01-19 15:07:31
 * @描述: 导入弹窗组件
-->
<template>
    <el-dialog v-if="isShow" v-model="dialogVisible" :close-on-click-modal="false" width="650px" class="import-dialog custom-dialog" :title="title || '数据导入'" @closed="dialogClosed">
        <el-steps :space="200" :active="step" simple>
            <el-step title="上传文件" :icon="UploadFilled" />
            <el-step title="预览数据" :icon="View" />
            <el-step title="导入数据" :icon="DataAnalysis" />
        </el-steps>
        <!-- 上传文件 -->
        <div class="upload-file-panel" v-if="step === 1">
            <!-- 文件上传失败 -->
            <div class="upload-fail" v-if="uploadErrorMessage">
                <div class="icon-box">
                    <el-icon><Download /></el-icon>
                </div>
                <div class="fail-tips">
                    <div class="title-text">异常提示</div>
                    <div class="content" v-html="uploadErrorMessage"></div>
                </div>
            </div>
            <!-- 文件上传中 -->
            <wait-progress v-else-if="isLoadingForUpload" />
            <!-- 选择上传文件 -->
            <div class="selected-file-box" v-else>
                <slot name="tips">
                    <ul class="tips-list">
                        <li>支持5MB以内的xls、xlsx格式文件</li>
                        <li>文件中的数据不能超过10000行，100列</li>
                        <li>
                            请按照数据模板的格式准备导入数据，模板中的表头名称不可更改，表头行不能删除。
                            <el-button link type="primary" v-if="templateFileUrl" @click="downExcelTemplate">模板下载</el-button>
                        </li>
                    </ul>
                </slot>
                <el-upload
                    class="upload-inner"
                    action=""
                    :drag="true"
                    :autoUpload="false"
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                    v-model:file-list="fileList"
                    :limit="1"
                    :on-exceed="fileExceedHandle"
                >
                    <el-icon class="upload-filled"><UploadFilled /></el-icon>
                    <div class="el-upload__text">
                        将文件拖到此处，或
                        <em>点击上传</em>
                    </div>
                </el-upload>
            </div>
        </div>
        <!-- 预览数据 -->
        <div class="data-preview-panel" v-if="step === 2">
            <div class="import-result-text">
                <i class="el-icon-warning"></i>
                共
                <span>{{ dataList.length }}</span>
                条数据， 导入
                <span>{{ columns.length }}</span>
                列
            </div>
            <data-table :props="{ height: 250 }" :query="() => ({ rows: dataList })" :isShowPagination="false" :columns="columns" />
        </div>
        <!-- 数据导入结果 -->
        <div class="import-result-panel" v-if="step === 3">
            <!-- 文件上传中 -->
            <wait-progress v-if="isLoadingForImport">
                <div class="state-text">
                    正在导入数据
                    <span>{{ dataList.length }}</span>
                    条
                </div>
            </wait-progress>
            <template v-else>
                <i class="el-icon-success"></i>
                <div class="title-text">批量导入完成</div>
                <div class="subtitle-text">
                    您已成功导入
                    <span>{{ dataList.length }}</span>
                    条，
                    <span>{{ columns.length }}</span>
                    列数据
                </div>
            </template>
        </div>
        <template #footer v-if="!isLoadingForUpload || !isLoadingForImport">
            <div class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" :disabled="fileList.length === 0" v-if="step === 1" @click="uploadHandle">{{ uploadErrorMessage ? "重新上传" : "确定上传" }}</el-button>
                <template v-else-if="step === 2">
                    <el-button @click="step = 1">上一步</el-button>
                    <el-button type="primary" @click="saveHandle">确定导入</el-button>
                </template>
                <el-button v-else-if="step === 3" type="primary" @click="init">再次导入</el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script setup>
import { ref } from "vue";
import { UploadFilled, View, DataAnalysis, Download } from "@element-plus/icons-vue";
import waitProgress from "./wait-progress.vue";
import commonApi from "@js/api/common";

const props = defineProps({
    isShow: {
        type: Boolean,
        default: true
    },
    title: {
        type: String
    },
    // 模板文件下载地址
    templateFileUrl: {
        type: String
    },
    // 预览数据列
    columns: {
        type: Array,
        default() {
            return [];
        },
        required: true
    },
    // 上传文件回调函数
    upload: {
        type: Function,
        required: true
    },
    // 保存上传的数据
    save: {
        type: Function,
        required: true
    }
});

const emits = defineEmits(["close", "refresh"]);

// 弹窗显示状态
const dialogVisible = ref(true);

// 是否需要关闭弹窗后刷新数据
const isRefresh = ref(false);

// 当前操作步骤
const step = ref(1);

// 上传异常信息
const uploadErrorMessage = ref("");

// 上传文件加载
const isLoadingForUpload = ref(false);

// 导入数据加载
const isLoadingForImport = ref(false);

// 数据列表
const dataList = ref([]);

// 上传的文件列表
const fileList = ref([]);

// 弹窗关闭
const dialogClosed = function () {
    emits("close");
    if (isRefresh.value) {
        emits("refresh");
    }
};

// 下载模板文件
const downExcelTemplate = function () {
    commonApi.download({
        type: "a",
        url: props.templateFileUrl
    });
};

// 当超出限制时，执行的钩子函数
const fileExceedHandle = function (files) {
    fileList.value = files;
};

// 上传文件操作
const uploadHandle = async function () {
    if (isLoadingForUpload.value) {
        return;
    }
    if (uploadErrorMessage.value) {
        // 重新上传
        init();
        return;
    }
    isLoadingForUpload.value = true;
    try {
        dataList.value = await props.upload(fileList.value[0]);
        step.value = 2;
    } catch (error) {
        uploadErrorMessage.value = error.msg;
    }
    isLoadingForUpload.value = false;
};

// 保存上传的数据
const saveHandle = async function () {
    if (isLoadingForImport.value) {
        return;
    }
    step.value = 3;
    isLoadingForImport.value = true;
    try {
        await props.save(dataList.value);
        isRefresh.value = true;
    } catch (error) {
        console.info(error);
    }
    isLoadingForImport.value = false;
};

const init = function () {
    step.value = 1;
    isRefresh.value = false;
    uploadErrorMessage.value = "";
    dataList.value = [];
    fileList.value = [];
};

init();
</script>
<style lang="scss">
.el-dialog.import-dialog {
    .el-dialog__body {
        min-height: 350px;

        .upload-file-panel {
            .wait-progress {
                margin-top: 100px;
            }
            .upload-fail {
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

            .selected-file-box {
                .tips-list {
                    padding: 20px 30px;
                    list-style: disc;
                    margin: 0px;
                    li {
                        line-height: 25px;
                        font-size: 13px;
                    }
                }
                .upload-inner {
                    height: 220px;

                    .el-icon.upload-filled {
                        font-size: 67px;
                        color: #c0c4cc;
                        margin-bottom: 16px;
                        line-height: 50px;
                    }
                }
            }
        }

        .data-preview-panel {
            .import-result-text {
                padding: 10px;
                text-align: right;
                line-height: 25px;
                i {
                    color: #e6a23c;
                    margin-right: 5px;
                    font-size: 20px;
                }
                span {
                    font-size: 15px;
                    display: inline-block;
                    padding: 0px 2px;
                    color: #f56c6c;
                    font-weight: bold;
                }
            }

            .data-table-panel {
                padding: 0px;
            }
        }

        .import-result-panel {
            height: 300px;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;

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

            i {
                font-size: 100px;
                color: #67c23a;
            }
            .title-text {
                font-weight: bold;
                font-size: 20px;
                padding: 8px 0px;
                line-height: 30px;
            }
            .subtitle-text {
                font-size: 13px;
                color: #666;
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

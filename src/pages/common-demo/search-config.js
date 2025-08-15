/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2022-10-27 15:47:36
 * @描述: 普通页面搜索配置
 */
import { ref } from "vue";
import demoApi from "@js/api/demo";
import { HANDLE_CODES } from "@js/services/constants";

export default function (actionHandle) {
    const stateList = [
        {
            value: "1",
            label: "草稿"
        },
        {
            value: "2",
            label: "审核中"
        },
        {
            value: "3",
            label: "审核通过"
        },
        {
            value: "4",
            label: "审核拒绝"
        },
        {
            value: "5",
            label: "待运行"
        },
        {
            value: "6",
            label: "运行中"
        },
        {
            value: "7",
            label: "暂停"
        },
        {
            value: "8",
            label: "已结束"
        }
    ];
    return {
        searchPageConfig: {
            searchFormProps: {
                fields: [
                    {
                        name: "productValue",
                        type: "select",
                        label: "所属产品",
                        value: "4",
                        clearable: false,
                        data: []
                    },
                    {
                        name: "serviceModuleValue",
                        type: "select",
                        label: "业务模块",
                        value: "",
                        data: [],
                        optionLabelKey: "name",
                        optionValueKey: "code"
                    },
                    {
                        name: "newVersionValue",
                        type: "select",
                        label: "所属版本",
                        value: "",
                        data: [
                            { label: "全部", value: "" },
                            { label: "新版", value: "NEW" },
                            { label: "旧版", value: "OLD" }
                        ]
                    },
                    {
                        name: "eleTypeCode",
                        type: "select",
                        label: "资源位名称",
                        value: "",
                        data: [],
                        optionLabelKey: "name",
                        optionValueKey: "typeCode"
                    },
                    {
                        name: "activityCode",
                        type: "select",
                        label: "活动归属",
                        value: "",
                        data: [],
                        optionLabelKey: "name",
                        optionValueKey: "code"
                    },
                    // 演示自定属性
                    {
                        name: "showPlanCodeName",
                        type: "input",
                        label: "计划名称",
                        slot: "searchForm_showPlanCodeName"
                    },
                    {
                        name: "state",
                        type: "select",
                        label: "计划状态",
                        value: "",
                        data: [
                            {
                                value: "",
                                label: "全部"
                            },
                            ...stateList
                        ]
                    },
                    {
                        name: "showPlanCode",
                        type: "input",
                        value: "",
                        label: "计划编码"
                    },
                    {
                        name: "createdBy",
                        type: "input",
                        label: "创建人"
                    },
                    {
                        name: "daterange",
                        type: "datePicker",
                        label: "计划时间",
                        inputWidth: 200,
                        props: {
                            type: "daterange",
                            rangeSeparator: "→",
                            style: {
                                width: "200px"
                            }
                        }
                    }
                ]
            },
            actionBarProps: {
                buttons: [
                    {
                        text: "新建计划",
                        handleCode: HANDLE_CODES.CREATE,
                        props: {
                            type: "primary",
                            style: {
                                float: "left"
                            }
                        },
                        click: actionHandle
                    },
                    {
                        text: "批量提交",
                        handleCode: HANDLE_CODES.BATCHSUBMIT,
                        click: actionHandle,
                        props: {
                            style: {
                                float: "left"
                            }
                        }
                    },
                    {
                        text: "批量撤回",
                        handleCode: HANDLE_CODES.BATCHRESET,
                        click: actionHandle,
                        props: {
                            style: {
                                float: "left"
                            }
                        }
                    },
                    {
                        text: "批量授权",
                        handleCode: HANDLE_CODES.BATCHAUTH,
                        click: actionHandle,
                        props: {
                            style: {
                                float: "left"
                            }
                        }
                    },
                    {
                        text: "自定义列",
                        handleCode: HANDLE_CODES.CUSTOM,
                        click: actionHandle
                    },
                    {
                        text: "导出表格",
                        handleCode: HANDLE_CODES.DOWNLOAD,
                        click: actionHandle
                    }
                ]
            },
            dataTableProps: {
                filters: {
                    listType: "2"
                },
                query: demoApi.queryPageListForCommon,
                columns: [
                    {
                        type: "selection",
                        width: "60",
                        align: "center"
                    },
                    {
                        label: "计划名称",
                        prop: "showPlanCodeName",
                        slot: "dataTable_showPlanCodeName",
                        minWidth: 130
                    },
                    {
                        label: "计划编码",
                        prop: "showPlanCode",
                        minWidth: 180
                    },
                    {
                        label: "所属产品",
                        prop: "productName",
                        minWidth: 100
                    },
                    {
                        label: "业务模块",
                        prop: "serviceModuleName",
                        showOverflowTooltip: true,
                        minWidth: 100
                    },
                    {
                        label: "资源位名称",
                        prop: "eleTypeName",
                        showOverflowTooltip: true,
                        minWidth: 140
                    },
                    {
                        label: "活动归属",
                        prop: "activityBelongName",
                        showOverflowTooltip: true,
                        minWidth: 140
                    },
                    {
                        type: "enum",
                        label: "计划状态",
                        prop: "auditStatus",
                        data: stateList,
                        minWidth: 100
                    },
                    {
                        label: "优先级",
                        prop: "priority",
                        minWidth: 100,
                        sortable: true
                    },
                    {
                        label: "开始时间",
                        prop: "startTime",
                        minWidth: 160,
                        type: "date",
                        formate: "YYYY-MM-DD HH:mm:ss"
                    },
                    {
                        label: "结束时间",
                        prop: "endTime",
                        minWidth: 160,
                        type: "date",
                        formate: "YYYY-MM-DD HH:mm:ss"
                    },
                    {
                        label: "最新曝光PV",
                        prop: "exposurePv",
                        type: "number",
                        minWidth: 100
                    },
                    {
                        label: "最新点击PV",
                        prop: "clickPv",
                        type: "number",
                        minWidth: 100
                    },
                    {
                        label: "点击率-PV",
                        prop: "clickPvRate",
                        minWidth: 100
                    },
                    {
                        label: "最近操作时间",
                        prop: "dateUpdated",
                        minWidth: 160,
                        type: "date",
                        formate: "YYYY-MM-DD HH:mm:ss"
                    },
                    {
                        label: "创建人",
                        prop: "createdBy",
                        minWidth: 120
                    },
                    {
                        label: "操作人",
                        prop: "updatedBy",
                        minWidth: 120
                    },
                    {
                        type: "action",
                        width: 180,
                        buttons: [
                            {
                                text: "复制",
                                handleCode: HANDLE_CODES.COPY,
                                click: actionHandle,
                                display: row => {
                                    const { sourceSystem, eleSourceTypeState } = row;
                                    return sourceSystem === "ELE" && +eleSourceTypeState === 0 ? true : false;
                                }
                            },
                            {
                                text: "监控",
                                handleCode: HANDLE_CODES.MONITOR,
                                click: actionHandle,
                                display: row => {
                                    const { sourceSystem, eleSourceTypeState } = row;
                                    return sourceSystem === "ELE" && +eleSourceTypeState === 0 ? true : false;
                                }
                            },
                            {
                                text: "审核详情",
                                handleCode: HANDLE_CODES.SEARCHEXAMINE,
                                click: actionHandle,
                                display: row => {
                                    const { auditStatus } = row;
                                    return +auditStatus !== 1 ? true : false;
                                }
                            },
                            {
                                text: "提交",
                                handleCode: HANDLE_CODES.SUBMIT,
                                click: actionHandle,
                                display: row => {
                                    const { auditStatus, sourceSystem } = row;
                                    return sourceSystem === "ELE" && (+auditStatus === 1 || +auditStatus === 4) ? true : false;
                                }
                            },
                            {
                                text: "编辑",
                                handleCode: HANDLE_CODES.UPDATE,
                                click: actionHandle,
                                display: row => {
                                    const { auditStatus, sourceSystem } = row;
                                    return sourceSystem === "ELE" && (+auditStatus === 1 || +auditStatus === 4 || +auditStatus === 7) ? true : false;
                                }
                            },
                            {
                                text: "撤回",
                                handleCode: HANDLE_CODES.RESET,
                                click: actionHandle,
                                display: row => {
                                    const { auditStatus, sourceSystem } = row;
                                    return sourceSystem === "ELE" && +auditStatus === 2 ? true : false;
                                }
                            },
                            {
                                text: "暂停",
                                handleCode: HANDLE_CODES.OFFSHELF,
                                click: actionHandle,
                                display: row => {
                                    const { auditStatus, sourceSystem } = row;
                                    return sourceSystem === "ELE" && +auditStatus === 6 ? true : false;
                                }
                            },
                            {
                                text: "启动",
                                handleCode: HANDLE_CODES.ONSHELF,
                                click: actionHandle,
                                display: row => {
                                    const { auditStatus, sourceSystem } = row;
                                    return sourceSystem === "ELE" && +auditStatus === 7 ? true : false;
                                }
                            },
                            {
                                text: "变更素材",
                                handleCode: HANDLE_CODES.SUPPLEMENT,
                                click: actionHandle,
                                display: row => {
                                    const { auditStatus, isNewPlatform, sourceSystem } = row;
                                    return sourceSystem === "ELE" && isNewPlatform === "1" && (+auditStatus === 5 || +auditStatus === 6 || +auditStatus === 7) ? true : false;
                                }
                            },
                            {
                                text: "删除",
                                handleCode: HANDLE_CODES.DELETE,
                                click: actionHandle,
                                display: row => {
                                    const { auditStatus, sourceSystem } = row;
                                    return sourceSystem === "ELE" && +auditStatus === 1 ? true : false;
                                }
                            }
                        ]
                    }
                ],
                queryParametersProcess: function (parameters) {
                    parameters.start = parameters.pageNo;
                    parameters.length = parameters.pageSize;
                    delete parameters.pageNo;
                    delete parameters.pageSize;
                    return parameters;
                },
                queryResponseProcess: function ({ total, rows }) {
                    return { rows, totalCount: total };
                },
                props: {
                    rowKey: "showPlanCode"
                }
            },
            pageName: "CommonDemo"
        },
        // 这里初始化时datatable不查询,等其业务数据加载完后设置成false才做查询
        isLoadingForInit: ref(true)
    };
}

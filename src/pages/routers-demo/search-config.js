/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2023-01-05 15:17:46
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2023-01-09 18:50:19
 * @项目的路径: \jfe-demo\src\pages\routers-demo\search-config.js
 * @描述: 路由页面demo搜索配置
 */
import demoApi from "@js/api/demo";
import { ORDER_STATUS, HANDLE_CODES } from "@js/services/constants";

export default function ({ showDialogFormHandle, batchUpdateHandle, downloadDataHandle, importDataHandle }) {
    return {
        searchFormProps: {
            fields: [
                {
                    name: "orderNo",
                    type: "input",
                    label: "订单编号"
                },
                {
                    name: "orderStatus",
                    type: "select",
                    label: "订单状态",
                    data: [{ label: "全部", value: "" }, ...ORDER_STATUS.map(item => ({ label: item.name, value: item.value }))]
                },
                {
                    name: "daterange",
                    type: "datePicker",
                    label: "订单日期",
                    inputWidth: 200,
                    props: {
                        type: "daterange",
                        style: {
                            width: "200px"
                        }
                    }
                },
                {
                    name: "receiveMan",
                    type: "input",
                    label: "收货人"
                },
                {
                    name: "receiveMobileNumber",
                    type: "input",
                    label: "收货电话"
                }
            ]
        },
        actionBarProps: {
            buttons: [
                {
                    text: "新建",
                    handleCode: HANDLE_CODES.CREATE,
                    props: {
                        type: "primary"
                    },
                    click: showDialogFormHandle
                },
                {
                    text: "批量修改",
                    handleCode: HANDLE_CODES.BATCHUPDATE,
                    click: batchUpdateHandle,
                    props: {
                        disabled: true
                    }
                },
                {
                    text: "导出EXCEL",
                    handleCode: HANDLE_CODES.DOWNLOAD,
                    click: downloadDataHandle
                },
                {
                    text: "导入表格",
                    handleCode: HANDLE_CODES.IMPORT,
                    click: importDataHandle
                }
            ]
        },
        dataTableProps: {
            query: demoApi.queryPageListForOrder,
            columns: [
                {
                    type: "selection",
                    width: "60",
                    align: "center"
                },
                {
                    label: "订单编号",
                    prop: "orderNo",
                    slot: "dataTable_orderNo",
                    minWidth: 160
                },
                {
                    label: "订单金额",
                    prop: "orderAmount",
                    type: "number",
                    digit: 2,
                    minWidth: 120
                },
                {
                    label: "订单状态",
                    prop: "orderStatus",
                    minWidth: 120,
                    type: "enum",
                    data: ORDER_STATUS.map(item => ({ label: item.name, value: item.value }))
                },
                {
                    label: "订单创建时间",
                    prop: "createTime",
                    minWidth: 160,
                    type: "date",
                    formate: "YYYY-MM-DD HH:mm:ss"
                },
                {
                    label: "商品图片",
                    prop: "goodsImgs",
                    type: "image",
                    separator: "|",
                    minWidth: 200
                },
                {
                    label: "商品数量",
                    prop: "goodsNumber",
                    minWidth: 100
                },
                {
                    label: "收货人",
                    prop: "receiveMan",
                    minWidth: 120
                },
                {
                    label: "收货电话",
                    prop: "receiveMobileNumber",
                    minWidth: 120
                },
                {
                    label: "备注",
                    prop: "remark",
                    showOverflowTooltip: true,
                    minWidth: 150
                },
                {
                    type: "action",
                    width: 80,
                    buttons: [
                        {
                            text: "编辑",
                            handleCode: HANDLE_CODES.UPDATE,
                            click: showDialogFormHandle
                        }
                    ]
                }
            ]
        }
    };
}

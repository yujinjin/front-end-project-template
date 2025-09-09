import { ORDER_STATUS, HANDLE_CODES } from "@js/services/constants";
import { dateFormat } from "@js/utils/format";

export default function ({ actionType, row, saveHandle }) {
    return {
        dialogProps: {
            title: (function () {
                if (actionType === HANDLE_CODES.CREATE) {
                    return "新增订单信息";
                } else if (actionType === HANDLE_CODES.UPDATE) {
                    return "修改订单信息";
                } else if (actionType === HANDLE_CODES.QUERY) {
                    return "查看订单信息";
                }
            })()
        },
        buttons: [
            {
                text: "取消"
            },
            {
                text: "保存",
                click: saveHandle,
                isShow: actionType === HANDLE_CODES.CREATE || actionType === HANDLE_CODES.UPDATE || actionType === HANDLE_CODES.COPY,
                props: {
                    type: "primary"
                }
            }
        ],
        inputFormProps: {
            props: {
                disabled: actionType === HANDLE_CODES.QUERY
            },
            value: (function () {
                if (actionType === HANDLE_CODES.CREATE) {
                    return null;
                }
                row = JSON.parse(JSON.stringify(row));
                if (row.createTime) {
                    row.createTime = dateFormat(row.createTime, "YYYY-MM-DD HH:mm:ss");
                }
                return row;
            })(),
            fields: [
                {
                    type: "input",
                    label: "订单编号",
                    name: "orderNo",
                    rules: [
                        {
                            required: true,
                            message: "请输入订单编号"
                        }
                    ]
                },
                {
                    type: "inputNumber",
                    label: "订单金额",
                    name: "orderAmount",
                    rules: [
                        {
                            required: true,
                            message: "请输入订单金额",
                            trigger: "blur"
                        }
                    ],
                    props: {
                        controls: false,
                        precision: 2,
                        min: 0.01,
                        max: 999999
                    }
                },
                {
                    type: "select",
                    label: "订单状态",
                    name: "orderStatus",
                    data: ORDER_STATUS.map(item => ({ label: item.name, value: item.value })),
                    rules: [
                        {
                            required: true,
                            message: "请选择订单状态",
                            trigger: "blur"
                        }
                    ]
                },
                {
                    type: "datePicker",
                    label: "订单创建时间",
                    name: "createTime",
                    props: {
                        type: "datetime"
                    },
                    rules: [
                        {
                            required: true,
                            message: "请选择订单创建时间",
                            trigger: "blur"
                        }
                    ]
                },
                {
                    type: "imgUpload",
                    label: "商品图片",
                    name: "goodsImgs",
                    props: {
                        cropperProps: true,
                        uploadProps: {
                            limit: 5
                        }
                    }
                },
                {
                    type: "inputNumber",
                    label: "商品数量",
                    name: "goodsNumber",
                    props: {
                        controls: false,
                        min: 1,
                        max: 999
                    },
                    rules: [
                        {
                            required: true,
                            message: "请输入商品数量",
                            trigger: "blur"
                        }
                    ]
                },
                {
                    type: "input",
                    label: "收货人",
                    name: "receiveMan",
                    rules: [
                        {
                            required: true,
                            message: "请输入收货人",
                            trigger: "blur"
                        }
                    ]
                },
                {
                    type: "input",
                    label: "收货人手机号",
                    name: "receiveMobileNumber",
                    props: {
                        maxlength: 11
                    },
                    rules: [
                        {
                            required: true,
                            message: "请输入收货人手机号",
                            trigger: "blur"
                        },
                        { pattern: /^1[3456789]\d{9}$/, message: "请输入正确格式的手机号" }
                    ]
                },
                {
                    type: "webEditor",
                    label: "备注",
                    name: "remark",
                    rules: [
                        {
                            required: true,
                            message: "请输入备注",
                            trigger: "blur"
                        }
                    ]
                }
            ]
        }
    };
}

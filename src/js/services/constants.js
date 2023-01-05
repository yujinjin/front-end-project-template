/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2022-10-25 10:08:07
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2023-01-05 10:48:20
 * @项目的路径: \front-end-project-template\src\js\services\constants.js
 * @描述: 常量集合
 */

// 分页每页记录数
export const PAGE_ITEMS = 50;

// 查询表单中的组件默认属性
export const SEARCH_FORM_FIELD_DEFAULT_ATTRIBUTES = {
    // input 输入框默认配置选项(具体见element plus Input 输入框文档)
    input: {
        placeholder: "请输入",
        clearable: true
    },
    // Input Number 数字输入框默认配置选项(具体见element plus Input Number 输入框文档)
    inputNumber: {
        placeholder: "请输入",
        controls: false,
        valueOnClear: null
    },
    // select 选择器默认配置选项（具体见element plus Select 选择器文档）
    select: {
        clearable: true,
        collapseTags: true,
        filterable: true,
        placeholder: "请选择"
    },
    // date-picker 日期时间选择器（具体见element plus date-picker文档）
    datePicker: {
        //year/month/date/dates/datetime/week/datetimerange/daterange/monthrange
        year: {
            type: "year",
            placeholder: "请选择"
        },
        month: {
            type: "month",
            placeholder: "请选择",
            valueFormat: "YYYY-MM"
        },
        date: {
            type: "date",
            placeholder: "请选择",
            valueFormat: "YYYY-MM-DD",
            disabledDate: function (time) {
                return time.getTime() > Date.now();
            }
        },
        dates: {
            type: "dates",
            placeholder: "请选择一个或者多个日期",
            valueFormat: "YYYY-MM-DD"
        },
        datetime: {
            type: "datetime",
            placeholder: "请选择日期和时间",
            valueFormat: "YYYY-MM-DD HH:mm:ss"
        },
        week: {
            type: "week",
            placeholder: "请选择",
            format: "[第]ww[周]"
        },
        datetimerange: {
            type: "datetimerange",
            startPlaceholder: "开始日期时间",
            endPlaceholder: "结束日期时间",
            valueFormat: "YYYY-MM-DD HH:mm:ss",
            rangeSeparator: "-"
        },
        daterange: {
            type: "daterange",
            startPlaceholder: "开始日期",
            endPlaceholder: "结束日期",
            valueFormat: "YYYY-MM-DD",
            rangeSeparator: " - "
        },
        monthrange: {
            type: "monthrange",
            startPlaceholder: "开始月份",
            endPlaceholder: "结束月份",
            valueFormat: "YYYY-MM",
            rangeSeparator: "-"
        }
    }
};

// 常用操作CODE列表
export const HANDLE_CODES = {
    CREATE: "CREATE", // 创建
    DELETE: "DELETE",
    UPDATE: "UPDATE", // 更新
    QUERY: "QUERY",
    IMPORT: "IMPORT",
    LOGS: "LOGS", // 日志
    CONVERTNAME: "CONVERTNAME", // 转换名称
    EXPORT: "EXPORT", // 导出
    SELFEXPORT: "SELFEXPORT", // 非组件封装导出
    DOWNLOAD: "DOWNLOAD", // 下载
    RESET: "RESET",
    DECORATION: "DECORATION",
    ONSHELF: "ONSHELF", // 上线
    OFFSHELF: "OFFSHELF", // 下线
    SEARCH: "SEARCH", // 查看
    SEARCHEXAMINE: "SEARCHEXAMINE", // 查看审核详情
    CUSTOM: "CUSTOM", // 自定义列
    AUTH: "AUTH", // 授权
    SUBMIT: "SUBMIT", // 提交
    SUPPLEMENT: "SUPPLEMENT", //补充素材
    RELATED: "RELATED", //关联计划
    COPY: "COPY", //复制
    PASS: "PASS", //通过
    REFUSE: "REFUSE", //拒绝
    MONITOR: "MONITOR", //监控
    DIALOGTYPE: "DIALOGTYPE", //弹窗类型
    BATCHDELETE: "BATCHDELETE", // 批量删除
    BATCHEXAMINE: "BATCHEXAMINE", //批量审核
    BATCHUPDATE: "BATCHUPDATE", //批量修改
    BATCHSUBMIT: "BATCHSUBMIT", //批量提交
    BATCHRESET: "BATCHRESET", //批量撤回
    BATCHAUTH: "BATCHAUTH", //批量授权
    PERMISSION: "PERMISSION" //权限管理
};

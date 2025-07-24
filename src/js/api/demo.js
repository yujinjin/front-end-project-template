/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2022-10-28 10:41:06
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2023-01-30 09:44:20
 * @项目的路径: \front-end-project-template\src\js\api\demo.js
 * @描述: demo 查询用例
 */
import request from "./request";

export default {
    /**
     * 常用页面 demo 分页查询列表
     */
    queryPageListForCommon(inputData, ajaxOptions) {
        return request(
            Object.assign(
                {
                    // /api/show/plan/list(模拟资源位的计划列表)
                    url: "/demo/queryPageListForCommon",
                    data: inputData
                },
                ajaxOptions || {}
            )
        );
    },

    /**
     * 获取配置数据
     */
    queryConfigData(ajaxOptions) {
        return request(
            Object.assign(
                {
                    // /api/show/rule/configCache.do(模拟资源位的配置数据)
                    url: "/demo/config.do"
                },
                ajaxOptions || {}
            )
        );
    },

    /**
     * 路由页面demo 分页查询
     */
    queryPageListForOrder(inputData, ajaxOptions) {
        return request(
            Object.assign(
                {
                    url: "/demo/queryPageListForOrder",
                    data: inputData
                },
                ajaxOptions || {}
            )
        );
    },

    /**
     * 新增订单
     */
    insertOrder(inputData, ajaxOptions) {
        return request(
            Object.assign(
                {
                    url: "/demo/insertOrder",
                    data: inputData
                },
                ajaxOptions || {}
            )
        );
    },

    /**
     * 修改订单
     */
    updateOrder(inputData, ajaxOptions) {
        return request(
            Object.assign(
                {
                    url: "/demo/updateOrder",
                    data: inputData
                },
                ajaxOptions || {}
            )
        );
    },

    /**
     * 复制订单
     */
    copyOrder(inputData, ajaxOptions) {
        return request(
            Object.assign(
                {
                    url: "/demo/copyOrder",
                    data: inputData
                },
                ajaxOptions || {}
            )
        );
    },

    /**
     * 导出订单
     */
    downloadOrder(inputData, ajaxOptions) {
        return request(
            Object.assign(
                {
                    url: "/demo/downloadOrder",
                    data: inputData
                },
                ajaxOptions || {}
            )
        );
    },

    /**
     * 导入订单文件
     */
    importFileForOrder(inputData, ajaxOptions) {
        return request(
            Object.assign(
                {
                    url: "/demo/importFileForOrder",
                    data: inputData
                },
                ajaxOptions || {}
            )
        );
    },

    /**
     * 导入订单数据
     */
    importDataForOrder(inputData, ajaxOptions) {
        return request(
            Object.assign(
                {
                    url: "/demo/importDataForOrder",
                    data: inputData
                },
                ajaxOptions || {}
            )
        );
    },

    /**
     * 批量修改订单信息
     */
    batchUpdateOrder(inputData, ajaxOptions) {
        return request(
            Object.assign(
                {
                    url: "/demo/batchUpdateOrder",
                    data: inputData
                },
                ajaxOptions || {}
            )
        );
    },

    /**
     * 根据订单号删除订单
     */
    deleteOrderByOrderNo(inputData, ajaxOptions) {
        return request(
            Object.assign(
                {
                    url: "/demo/deleteOrderByOrderNo",
                    data: inputData
                },
                ajaxOptions || {}
            )
        );
    }
};

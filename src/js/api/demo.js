/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2022-10-28 10:41:06
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2022-11-08 16:31:51
 * @项目的路径: \360-manager-H5\src\js\api\demo.js
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
                    url: "/common/demo/queryPageList",
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
                    url: "/common/demo/config.do"
                },
                ajaxOptions || {}
            )
        );
    }
};

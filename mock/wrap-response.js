/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2022-12-13 14:03:34
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2023-01-18 13:54:46
 * @项目的路径: \front-end-project-template\mock\wrap-response.js
 * @描述: 接口的外部封装
 */
const Mock = require("mockjs");

/**
 * @param template data的数据模板
 * @param randomFlag 数据返回成功或失败是否用随机的方式
 * @param dataSize data数据的数组长度
 * @param codes 返回的异常CODES
 */
module.exports = function (template, randomFlag = false, dataSize, codes) {
    const wrapTemplate = {
        "code|1": codes || [""],
        "flag|1": randomFlag ? ["S", "F"] : ["S"],
        msg: function () {
            if (this.flag === "F") {
                return Mock.Random.ctitle(5, 20);
            } else {
                return null;
            }
        }
    };
    if (dataSize) {
        wrapTemplate["data|" + dataSize] = template;
    } else {
        wrapTemplate.data = template;
    }
    return Mock.mock(wrapTemplate);
};

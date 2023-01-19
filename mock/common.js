/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2023-01-18 13:39:32
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2023-01-18 14:25:22
 * @项目的路径: \front-end-project-template\mock\common.js
 * @描述: commom模块mock数据
 */

const Mock = require("mockjs");
const wrapResponse = require("./wrap-response");

module.exports = function (app) {
    // 上传图片
    app.post("/common/uploadImage", function (request, response) {
        response.json(wrapResponse(Mock.Random.image(null, Mock.Random.color(), Mock.Random.color())));
    });
};

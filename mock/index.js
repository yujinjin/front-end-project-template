/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2022-11-08 11:59:35
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2023-01-19 11:49:25
 * @项目的路径: \front-end-project-template\mock\index.js
 * @描述: dev server mock数据
 */
const demo = require("./demo");
const common = require("./common");

module.exports = function (app) {
    common(app);
    demo(app);
};

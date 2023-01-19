/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2023-01-18 13:39:27
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2023-01-18 14:24:59
 * @项目的路径: \front-end-project-template\mock\demo.js
 * @描述: demo模块mock数据
 */
const Mock = require("mockjs");
const wrapResponse = require("./wrap-response");

module.exports = function (app) {
    // 常用页面demo 分页查询
    app.post("/demo/queryPageListForCommon", function (request, response) {
        const time = new Date().getTime();
        response.json(
            wrapResponse({
                "total|10-1000": 0,
                "rows|50": [
                    {
                        showPlanCodeName: "@ctitle", // 计划名称
                        showPlanCode: "ELE@date('yyyyMMddHH')@string('number', 8)", // 计划编码
                        "productName|1": ["360借条", "奇富钱包", "360分期贷", "H5/外部等", "360信用钱包", "360周转灵"], // 所属产品
                        serviceModuleName: "@cword(2, 8)", // 业务模块
                        eleTypeName: "@cword(4, 20)", // 资源位名称
                        activityBelongName: "@cword(4, 12)", // 活动归属
                        "auditStatus|1": ["1", "2", "3", "4", "5", "6", "7", "8"], // 计划状态
                        "priority|0-100": 0, // 优先级
                        startTime: "@integer(" + (time - 30 * 24 * 60 * 60 * 1000) + ", " + (time + 30 * 24 * 60 * 60 * 1000) + ")", // 开始时间
                        endTime: function () {
                            return this.startTime + Mock.Random.integer(24 * 60 * 60 * 1000, 30 * 24 * 60 * 60 * 1000);
                        }, // 结束时间
                        "exposurePv|0-1000000": 0, // 最新曝光PV
                        "clickPv|0-1000000": 0, // 最新点击PV
                        sourceSystem: "ELE",
                        clickPvRate: "@float(0, 100, 2, 2)", // 点击率-PV
                        dateUpdated: "@integer(" + (time - 30 * 24 * 60 * 60 * 1000) + ", " + time + ")", // 最近操作时间
                        createdBy: "@cname()", // 创建人
                        updatedBy: "@cname()" // 操作人
                    }
                ]
            })
        );
    });

    // 获取配置数据
    app.post("/demo/config.do", function (request, response) {
        response.json(
            wrapResponse({
                "activities|10-20": [
                    {
                        code: "@string('upper', 2, 4)_@string('upper', 2, 4)",
                        name: "@cword(4, 10)"
                    }
                ],
                elements: [
                    {
                        code: "4",
                        name: "360借条",
                        "serviceModules|5-50": [
                            {
                                code: "@string('upper', 2, 4)_@string('upper', 2, 4)",
                                name: "@cword(4, 10)"
                            }
                        ],
                        eleSourceTypeBos: function () {
                            return new Array(Mock.Random.integer(10, 200)).fill(0).map(() => ({
                                serviceModule: this.serviceModules[Mock.Random.integer(0, this.serviceModules.length - 1)].code,
                                typeCode: Mock.mock("@string('upper', 6)"),
                                name: Mock.mock("@cword(4, 10)"),
                                code: Mock.mock("@string('number', 8)")
                            }));
                        }
                    },
                    {
                        code: "20",
                        name: "奇富钱包",
                        "serviceModules|5-20": [
                            {
                                code: "@string('upper', 2, 4)_@string('upper', 2, 4)",
                                name: "@cword(4, 10)"
                            }
                        ],
                        eleSourceTypeBos: function () {
                            return new Array(Mock.Random.integer(10, 100)).fill(0).map(() => ({
                                serviceModule: this.serviceModules[Mock.Random.integer(0, this.serviceModules.length - 1)].code,
                                typeCode: Mock.mock("@string('upper', 6)"),
                                name: Mock.mock("@cword(4, 10)"),
                                code: Mock.mock("@string('number', 8)")
                            }));
                        }
                    },
                    {
                        code: "7",
                        name: "360分期贷",
                        "serviceModules|1-20": [
                            {
                                code: "@string('upper', 2, 4)_@string('upper', 2, 4)",
                                name: "@cword(4, 10)"
                            }
                        ],
                        eleSourceTypeBos: function () {
                            return new Array(Mock.Random.integer(10, 40)).fill(0).map(() => ({
                                serviceModule: this.serviceModules[Mock.Random.integer(0, this.serviceModules.length - 1)].code,
                                typeCode: Mock.mock("@string('upper', 6)"),
                                name: Mock.mock("@cword(4, 10)"),
                                code: Mock.mock("@string('number', 8)")
                            }));
                        }
                    },
                    {
                        code: "19",
                        name: "H5/外部等",
                        "serviceModules|5-10": [
                            {
                                code: "@string('upper', 2, 4)_@string('upper', 2, 4)",
                                name: "@cword(4, 10)"
                            }
                        ],
                        eleSourceTypeBos: function () {
                            return new Array(Mock.Random.integer(10, 30)).fill(0).map(() => ({
                                serviceModule: this.serviceModules[Mock.Random.integer(0, this.serviceModules.length - 1)].code,
                                typeCode: Mock.mock("@string('upper', 6)"),
                                name: Mock.mock("@cword(4, 10)"),
                                code: Mock.mock("@string('number', 8)")
                            }));
                        }
                    },
                    {
                        code: "6",
                        name: "360信用钱包",
                        "serviceModules|5-10": [
                            {
                                code: "@string('upper', 2, 4)_@string('upper', 2, 4)",
                                name: "@cword(4, 10)"
                            }
                        ],
                        eleSourceTypeBos: function () {
                            return new Array(Mock.Random.integer(10, 20)).fill(0).map(() => ({
                                serviceModule: this.serviceModules[Mock.Random.integer(0, this.serviceModules.length - 1)].code,
                                typeCode: Mock.mock("@string('upper', 6)"),
                                name: Mock.mock("@cword(4, 10)"),
                                code: Mock.mock("@string('number', 8)")
                            }));
                        }
                    },
                    {
                        code: "13",
                        name: "360周转灵",
                        "serviceModules|5-10": [
                            {
                                code: "@string('upper', 2, 4)_@string('upper', 2, 4)",
                                name: "@cword(4, 10)"
                            }
                        ],
                        eleSourceTypeBos: function () {
                            return new Array(Mock.Random.integer(10, 20)).fill(0).map(() => ({
                                serviceModule: this.serviceModules[Mock.Random.integer(0, this.serviceModules.length - 1)].code,
                                typeCode: Mock.mock("@string('upper', 6)"),
                                name: Mock.mock("@cword(4, 10)"),
                                code: Mock.mock("@string('number', 8)")
                            }));
                        }
                    }
                ]
            })
        );
    });

    // 路由页面demo 分页查询
    app.post("/demo/queryPageListForRouters", function (request, response) {
        const time = new Date().getTime();
        response.json(
            wrapResponse({
                "total|10-1000": 0,
                "rows|50": [
                    {
                        activityBelongName: "@cword(4, 20)", // 活动名称
                        materialCode: "SC@date('yyyyMMddHH')@string('number', 8)", // 素材ID
                        picture: "@image()", // 素材缩略图
                        "genre|1": [1, 2], // 素材类型
                        pictureLength: "@string('number', 2, 4)", // 素材高度
                        state: [0, 1, 2, 3], // 素材状态
                        refuseRemark: "@cword(4, 20)",
                        eleType: "", // 关联资源位
                        eleState: "", // 关联资源位状态
                        dateCreated: "@integer(" + (time - 30 * 24 * 60 * 60 * 1000) + ", " + time + ")", // 创建时间
                        createdBy: "@cname()", // 创建人
                        pictureSize: "@string('number', 1, 4)", // 素材大小
                        pictureWidth: "@string('number', 2, 4)" // 素材宽度
                    }
                ]
            })
        );
    });
};

/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2023-01-18 13:39:32
 * @描述: commom模块mock数据
 */
import Mock from "mockjs";
import wrapResponse from "./wrap-response";

export default [
    {
        url: "/common/uploadImage",
        type: "post",
        data: () => wrapResponse(Mock.Random.image(null, Mock.Random.color(), Mock.Random.color()))
    }
];

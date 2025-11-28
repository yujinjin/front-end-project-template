/*
 * @创建者: yujinjin9@126.com
 * @描述: 系统模块mock数据
 */

import wrapResponse, { type MockRequestConfig } from "./wrap-response";

export default <MockRequestConfig[]>[
    // 登录
    {
        url: "/system/login",
        type: "post",
        data: function () {
            return wrapResponse({
                token: "@word(120)",
                expiredIn: "@integer(3600000, 864000000)",
                userName: "@name()"
            });
        }
    },
    // 发送验证码
    {
        url: "/system/sendValidateCode",
        type: "post",
        data: function () {
            return wrapResponse(null, true);
        }
    }
];

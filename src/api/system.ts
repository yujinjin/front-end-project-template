/**
 * 作者：yujinjin9@126.com
 * 描述：系统管理API接口
 */

import request, { type RequestConfig } from "./request";

export default {
    /**
     * 用户登录或注册
     */
    login<T>(inputData: Record<string, any>, ajaxOptions?: RequestConfig) {
        return request<T>(
            Object.assign(
                {
                    url: "/system/login",
                    data: inputData
                },
                ajaxOptions || {}
            )
        );
    },

    /**
     * 发送验证码
     */
    sendValidateCode(inputData: Record<string, any>, ajaxOptions?: RequestConfig) {
        return request(
            Object.assign(
                {
                    url: "/system/sendValidateCode",
                    data: inputData,
                    method: "POST"
                },
                ajaxOptions || {}
            )
        );
    }
};

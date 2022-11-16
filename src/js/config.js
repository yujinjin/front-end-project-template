/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2022-10-21 10:03:56
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2022-10-21 10:26:02
 * @项目的路径: \360-manager-H5\src\services\config.js
 * @描述: APP应用配置
 */

import { BuildEnv } from "@js/services/enums";

// 全局应用配置信息
export default {
    /** 当前环境模式 */
    buildEnv: process.env.NODE_ENV,

    /** 应用名称 */
    appName: process.env.VUE_APP_NAME,

    /** 是否调试模式 */
    isDebug: process.env.NODE_ENV !== BuildEnv.PRODUCTION,

    /** 应用的版本 */
    version: process.env.VUE_APP_VERSION,

    /** 请求的API版本号 */
    apiVersion: "0.0.1",

    /** 应用构建时间 */
    buildTime: new Date(process.env.VUE_APP_BUILD_TIME)
};

/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2022-10-21 10:03:56
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

    /** web站点的接口地址 */
    webApiDomain: ""
};

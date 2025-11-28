/**
 * 作者：yujinjin9@126.com
 * 时间：2025-10-30
 * 描述：APP应用配置
 */
/// <reference types="node" />

/** APP当前环境配置 */
export interface Config {
    /** 当前环境模式 */
    readonly buildEnv: BuildEnv;

    /** 应用名称 */
    readonly appName: string;

    /** 是否调试模式 */
    readonly isDebug: boolean;

    /** 请求的API版本号 */
    readonly apiVersion: string;

    /** 当前web是否是hash 模式 */
    readonly isWebHash: boolean;

    /** 当前web项目服务部署根目录（路径） */
    readonly projectContentPath: string;

    /** 应该构建时间 */
    readonly buildTime: Date;

    /** web站点的接口地址 */
    readonly webApiDomain: string;

    /** 资源服务站点的地址 */
    readonly resourceDomain: string;

    /** 上传服务站点的地址 */
    readonly uploadDomain: string;

    /** 当前APP应用的平台 */
    readonly appPlatform: AppPlatform;

    /** 当前设备运行系统 */
    readonly deviceSystem: DeviceSystem;
}

/** 当前项目编译环境 */
export enum BuildEnv {
    // 开发模式
    DEVELOPMENT = "development",

    // 生产模式
    PRODUCTION = "production",

    // 测试模式
    TEST = "test"
}

/** 当前APP应用的平台 */
export enum AppPlatform {
    /** 微信H5平台 */
    WEIXIN_H5 = "weixin_h5",

    /** 微信小程序平台 */
    WEIXIN_MINAPP = "weixin_minapp",

    /** app应用 */
    APP = "app",

    /** 新浪微博平台 */
    WEIBO = "weibo",

    /** 抖音平台 */
    DOUYIN = "douyin",

    /** 快手平台 */
    KUAISHOU = "kuaishou",

    /** 支付宝平台 */
    ALIPAY = "alipay",

    /** h5平台（其他） */
    H5 = "h5"
}

/** 设备运行系统 */
export enum DeviceSystem {
    iOS = "iOS",

    macOS = "macOS",

    iPad = "iPad",

    android = "android",

    windows = "windows",

    linux = "linux",

    other = "other"
}

// 获取设备运行系统
const getDeviceSystem = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (/iphone|ipod/.test(userAgent)) {
        return DeviceSystem.iOS;
    } else if (/ipad/.test(userAgent)) {
        return DeviceSystem.iPad;
    } else if (/macintosh|mac os x/.test(userAgent)) {
        return DeviceSystem.macOS;
    } else if (/android/.test(userAgent)) {
        return DeviceSystem.android;
    } else if (/windows|win32/.test(userAgent)) {
        return DeviceSystem.windows;
    } else if (/linux/.test(userAgent)) {
        return DeviceSystem.linux;
    }
    return DeviceSystem.other;
};

const getAppPlatform = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (/micromessenger/.test(userAgent)) {
        // 微信小程序检测
        if ((window as any)["__wxjs_environment"] === "miniprogram" || /miniprogram/.test(userAgent)) {
            return AppPlatform.WEIXIN_MINAPP;
        }
        return AppPlatform.WEIXIN_H5;
    } else if (/tiktok|douyin/.test(userAgent)) {
        return AppPlatform.DOUYIN;
    } else if (/kuaishou|kwai/.test(userAgent)) {
        return AppPlatform.KUAISHOU;
    } else if (/alipay/.test(userAgent)) {
        return AppPlatform.ALIPAY;
    } else if (/weibo/.test(userAgent)) {
        return AppPlatform.WEIBO;
    }
    return AppPlatform.H5;
};

export default <Config>{
    /** 当前环境模式 */
    buildEnv: <BuildEnv>process.env.NODE_ENV,

    /** 应用名称 */
    appName: import.meta.env.VITE_APP_NAME,

    /** 是否调试模式 */
    isDebug: <BuildEnv>process.env.NODE_ENV === BuildEnv.DEVELOPMENT || import.meta.env.MODE === "dev",

    /** 请求的API版本号 */
    apiVersion: "0.0.1",

    /** 当前web是否是hash 模式 */
    isWebHash: import.meta.env.VITE_APP_WEB_HASH === "1",

    /** 当前web项目服务部署根目录（路径） */
    projectContentPath: VITE_APP_PROJECT_CONTENT_PATH,

    /** 项目构建时间 */
    buildTime: new Date(VITE_APP_BUILD_TIME!),

    /** web站点的接口地址 */
    webApiDomain: import.meta.env.VITE_APP_API_DOMAIN,

    /** 资源服务站点的地址 */
    resourceDomain: import.meta.env.VITE_APP_RESOURCE_DOMAIN,

    /** 上传服务站点的地址 */
    uploadDomain: import.meta.env.VITE_APP_UPLOAD_DOMAIN,

    /** 当前APP应用的平台 */
    appPlatform: getAppPlatform(),

    /** 当前设备运行系统 */
    deviceSystem: getDeviceSystem()
};

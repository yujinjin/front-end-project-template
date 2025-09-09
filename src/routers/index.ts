/*
 * @创建者: yujinjin9@126.com
 * @描述: 路由配置
 * meta: {
 *  requiresAuth: boolean, // 是否需要登录
 *  title: "首页" // 页面标题
 * }
 */
import { type RouteRecordRaw, type Router, createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import { ElMessage } from "element-plus";
import others from "./others";
import plays from "./plays";
import config from "@/config";
import { storageStore } from "@/stores";

export default function (): Router {
    const dataStorages = storageStore();

    const router: Router = createRouter({
        history: config.isWebHash ? createWebHashHistory(config.projectContentPath ? config.projectContentPath + "/" : "") : createWebHistory(config.projectContentPath || "/"), // HTML5 hash模式 |history模式
        routes: <Array<RouteRecordRaw>>[
            ...others,
            ...plays,
            {
                path: "/*",
                name: "not-found", // 未发现该页面
                meta: {
                    requireAuth: false
                },
                component: () => import("@views/error/not-found.vue")
            }
        ],
        scrollBehavior: () => ({ left: 0, top: 0 }),
        strict: true
    });
    // 注册一个全局前置守卫
    router.beforeEach(to => {
        // TODO: 自定义业务实现
        return true;
    });
    // 注册全局后置钩子
    router.afterEach(() => {
        // TODO: 根据业务需要添加
    });

    /**
     * @description 监听路由错误，正则匹配对应的错误消息后，自动刷新界面
     * 解决前端发版出现-跳转路由页面加载该页面js、css文件404时，触发router.onError的场景
     * 为了避免在特殊情况下服务器丢失资源导致无限报错刷新，这里做了进一步控制判断（半个小时内只会刷新一次）
     */
    router.onError(error => {
        const pattern = /Loading( CSS)? chunk (\S)+ failed/g;
        const isChunkLoadFailed = error.message.match(pattern);
        if (isChunkLoadFailed && dataStorages.isExpireForTryReloadTime()) {
            ElMessage({
                message: "系统已升级，正在刷新本地缓存，请稍候...",
                type: "warning",
                duration: 1500,
                offset: 60
            });
            dataStorages.setTryReloadTimeValue();
            setTimeout(() => {
                location.reload();
            }, 1500);
        }
    });
    return router;
}

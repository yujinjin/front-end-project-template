import { createRouter, createWebHashHistory, createWebHistory, type RouteRecordRaw, type Router } from "vue-router";
import config from "@/config";
import logs from "@/services/logs";
import useRouterNavigation from "@/routers/use-router-navigation";

export default function (): Router {
    const { rewriteRouterNavigation, beforeEachHandler, afterEachHandler } = useRouterNavigation();

    const router: Router = createRouter({
        history: config.isWebHash ? createWebHashHistory() : createWebHistory(),
        routes: <Array<RouteRecordRaw>>[
            {
                path: "/",
                alias: "/home",
                name: "home",
                meta: {
                    title: "首页",
                    isShowFooter: true
                },
                component: () => import("@views/home/index.vue")
            },
            {
                path: "/shopping-cart",
                name: "shopping-cart",
                meta: {
                    title: "购物车",
                    isShowFooter: true
                },
                component: () => import("@views/shopping-cart/index.vue")
            },
            {
                path: "/login",
                name: "login",
                meta: {
                    title: "登录"
                },
                component: () => import("@views/login/index.vue")
            },
            {
                path: "/user",
                name: "user",
                meta: {
                    title: "用户中心",
                    requiresAuth: true,
                    isShowFooter: true
                },
                component: () => import("@views/user/index.vue")
            },
            {
                path: "/about",
                name: "about",
                meta: {
                    title: "关于我们"
                },
                component: () => import("@views/about/index.vue")
            }
        ],
        scrollBehavior: () => ({ left: 0, top: 0 }),
        strict: true
    });

    // 重写 router 导航方法
    rewriteRouterNavigation(router);

    // 注册一个全局前置守卫
    router.beforeEach((to, from, next) => {
        logs.debug("beforeEach>>>>>>>>>>>>>", to);
        beforeEachHandler(to, from, next);
    });

    // 注册全局后置钩子
    router.afterEach(to => {
        logs.debug("afterEach>>>>>>>>>>>>>", to);
        afterEachHandler(to);
    });
    return router;
}

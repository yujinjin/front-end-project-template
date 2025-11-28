import { type RouteLocationNormalizedGeneric, type NavigationGuardNext, type Router, type RouteLocationAsRelativeGeneric, type RouteLocationAsPathGeneric } from "vue-router";
import { useNavbarStore, useDataStore, useFootbarStore, useStorageStore } from "@/stores/index";

export const updatePageTitle = function (title: string) {
    // 设置浏览器的title
    document.title = title;
    if (/ip(hone|od|ad)/i.test(navigator.userAgent)) {
        const iframeElement: HTMLIFrameElement = document.createElement("iframe");
        iframeElement.src = "/logo.svg";
        iframeElement.style.display = "none";
        iframeElement.onload = function () {
            setTimeout(function () {
                iframeElement.remove();
            }, 9);
        };
        document.body.appendChild(iframeElement);
    }
};

export default function useRouterNavigation() {
    const navbarStore = useNavbarStore();
    const dataStore = useDataStore();
    const footerbarStore = useFootbarStore();
    const storageStore = useStorageStore();

    // 初始化导航栏状态
    const initNavBarState = function (to: RouteLocationNormalizedGeneric) {
        if (to.meta.isShowNavBar === false || to.meta.isShowFooter === true) {
            // 如果路由配置中设置了不显示导航栏或底部栏，则隐藏导航栏
            navbarStore.updateNavBarShowState(false);
        } else if (to.meta.isResetNavBarState !== true) {
            // 如果路由配置中设置了不重置导航栏状态，则根据当前导航栏状态判断是否需要重置
            if (!navbarStore.navBarInfo.isDefaultState) {
                navbarStore.resetNavBarInfo();
            } else {
                navbarStore.updateNavBarShowState(true);
            }
            if (to.meta.title) {
                // 如果路由配置中设置了标题，则更新导航栏标题
                navbarStore.updateNavBarTitle(to.meta.title);
            }
        }
    };

    // 初始化底部栏状态
    const initFootBarState = function (to: RouteLocationNormalizedGeneric) {
        footerbarStore.updateFootBarShowState(to.meta.isShowFooter === true);
    };

    // go、back、forward、push 这4个方法都用来标记路由跳转方向
    // 重写路由跳转方法
    let isInitRouterNavigation = false;
    const rewriteRouterNavigation = function (router: Router) {
        // 重写 router.push 方法，标记主动 push
        const originalPush = router.push;
        router.push = function (to: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric) {
            isInitRouterNavigation = true;
            dataStore.setRouteDirection("forward");
            // 调用原始的 push 方法
            return originalPush.call(this, to);
        };

        // 重写 router.replace 方法，标记主动 replace
        const originalReplace = router.replace;
        router.replace = function (to: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric) {
            // console.info("replace变化》》》》》》》》》");
            isInitRouterNavigation = true;
            dataStore.setRouteDirection("forward");
            // 调用原始的 replace 方法
            return originalReplace.call(this, to);
        };

        // 重写 router.go 方法，标记主动 go
        const originalGo = router.go;
        router.go = function (delta: number) {
            // console.info("go变化》》》》》》》》》");
            isInitRouterNavigation = true;
            dataStore.setRouteDirection(delta > 0 ? "forward" : "back");
            // 调用原始的 go 方法
            return originalGo.call(this, delta);
        };

        // 重写 router.back 方法，标记主动 back
        const originalBack = router.back;
        router.back = function () {
            // console.info("back变化》》》》》》》》》");
            isInitRouterNavigation = true;
            dataStore.setRouteDirection("back");
            // 调用原始的 back 方法
            return originalBack.call(this);
        };
    };

    // 全局前置守卫
    const beforeEachHandler = function (to: RouteLocationNormalizedGeneric, from: RouteLocationNormalizedGeneric, next: NavigationGuardNext) {
        // console.info("beforeEachHandler变化》》》》》》》》》", history.length);
        if (to.meta.requiresAuth === true && !storageStore.isLogin() && to.name !== "login") {
            // 未登录的用户进入了需要登录的页面, 全局触发去登录事件
            // eventsStore.trigger({ eventName: "gotoLogin" });
            next({ name: "login", query: { redirect: encodeURIComponent(to.fullPath) } });
        } else {
            next();
        }
    };

    // 全局后置守卫
    const afterEachHandler = function (to: RouteLocationNormalizedGeneric) {
        updatePageTitle(to.meta.title || "");
        initNavBarState(to);
        initFootBarState(to);
        if (isInitRouterNavigation === false) {
            // 说明当前是首次路由跳转或通过浏览器前进后退按钮触发的路由跳转
            // 由于这两种情况都不是主动触发的路由跳转，所以默认设置为 forward
            dataStore.setRouteDirection("forward");
        } else {
            isInitRouterNavigation = false;
        }
    };

    return {
        rewriteRouterNavigation,
        beforeEachHandler,
        afterEachHandler
    };
}

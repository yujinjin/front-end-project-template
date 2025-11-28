/*
 * @创建者: yujinjin9@126.com
 * @描述: vue 声明
 */
import { type ComponentPublicInstance, type FunctionalComponent } from "vue";
import { type Router, type RouteLocationNormalizedLoaded } from "vue-router";

/** 将第三方变量挂载到每一个 vue 示例中 */
declare module "vue" {
    export type JSXComponent<Props = any> = { new (): ComponentPublicInstance<Props> } | FunctionalComponent<Props>;
    import { type CompatVue } from "vue";
    const Vue: CompatVue;
    export default Vue;
    export * from "vue";
    interface ComponentCustomProperties {
        $store: Store;
        $route: RouteLocationNormalizedLoaded;
        $router: Router;
    }

    interface ComponentCustomOptions {
        beforeRouteUpdate: (to: Route, from: Route, next: () => void) => void;
    }
}

/** vue router meta 配置信息 */
declare module "vue-router" {
    interface RouteMeta {
        /** 是否显示导航栏，默认显示 */
        isShowNavBar?: boolean;

        /** 是否显示底部栏, 默认不显示 */
        isShowFooter?: boolean;

        /**
         * 是否重置导航栏状态，默认会重置
         * 说明：之所以增加这个状态是因为默认会重置，而在一些场景下会有一些特殊的导航栏状态显示，路由切换时会默认重置导航栏状态，但到具体页面时再设置一遍状态栏连续变化2次会显得不友好
         */
        isResetNavBarState?: boolean;

        /** 是否需要登录，默认不需要登陆 */
        requireAuth?: boolean;

        /** 页面标题 */
        title?: string;

        /** 是否保存当前页面路由状态，默认不保存 */
        keepAlive?: boolean;
    }
}

declare module "*.vue" {
    import { type DefineComponent } from "vue";
    const Component: DefineComponent<object, object, any>;
    export default Component;
}

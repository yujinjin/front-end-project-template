/*
 * @创建者: yujinjin9@126.com
 * @描述: 其他页面路由
 */

import { type RouteRecordRaw } from "vue-router";

export default <Array<RouteRecordRaw>>[
    {
        name: "welcome", // 中台默认的欢迎页面
        path: "/",
        component: () => import("@views/others/welcome.vue")
    }
];

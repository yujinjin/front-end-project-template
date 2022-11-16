/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2022-10-24 10:57:04
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2022-10-24 15:10:29
 * @项目的路径: \360-manager-H5\src\pages\routers-demo\index.js
 * @描述: routers页面演示
 */
import siteInstance from "@js/main";
import vueApp from "@pages/App";
import { createRouter, createWebHashHistory } from "vue-router";

siteInstance(
    vueApp,
    {
        routers: createRouter({
            history: createWebHashHistory(),
            routes: [
                {
                    name: "home",
                    path: "/",
                    component: () => import("./home")
                },
                {
                    name: "about",
                    path: "/about",
                    component: () => import("./about")
                }
            ]
        })
    },
    "routers页面演示"
);

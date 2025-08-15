/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2022-10-24 10:57:04
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
                }
            ]
        })
    },
    "routers页面演示"
);

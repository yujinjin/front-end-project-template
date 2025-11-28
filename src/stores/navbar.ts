/**
 * @创建者: yujinjin9@126.com
 * @描述: App导航栏数据管理
 */

import { defineStore } from "pinia";
import type { Component } from "vue";
import { type NavBarInfo, getDefaultNavBarInfo } from "@/services/constants";

export default defineStore("navbar", {
    state: () => ({
        navBarInfo: getDefaultNavBarInfo()
    }),
    actions: {
        // 更新导航栏信息
        updateNavBarInfo(data: NavBarInfo) {
            this.navBarInfo = data;
            this.navBarInfo.isDefaultState = false;
        },
        // 重置导航栏信息为默认值
        resetNavBarInfo() {
            this.navBarInfo = getDefaultNavBarInfo();
        },
        // 修改导航栏标题
        updateNavBarTitle(title: string) {
            this.navBarInfo.center.contents = title;
        },
        // 修改导航栏显示状态
        updateNavBarShowState(isShow: boolean) {
            this.navBarInfo.isShow = isShow;
        },
        // 修改导航栏左侧内容
        updateNavBarLeft({ contents, callBack, isShow }: { contents?: string | Component; callBack?: (() => Promise<boolean | void>) | null; isShow?: boolean }) {
            this.navBarInfo.left.contents = contents ?? this.navBarInfo.left.contents;
            this.navBarInfo.left.callBack = callBack ?? this.navBarInfo.left.callBack;
            this.navBarInfo.left.isShow = isShow ?? this.navBarInfo.left.isShow;
            this.navBarInfo.isDefaultState = false;
        },
        // 修改导航栏中心内容
        updateNavBarCenter({ contents, callBack, isShow }: { contents?: string | Component; callBack?: (() => Promise<boolean | void>) | null; isShow?: boolean }) {
            this.navBarInfo.center.contents = contents ?? this.navBarInfo.center.contents;
            this.navBarInfo.center.callBack = callBack ?? this.navBarInfo.center.callBack;
            this.navBarInfo.center.isShow = isShow ?? this.navBarInfo.center.isShow;
            this.navBarInfo.isDefaultState = false;
        },
        // 修改导航栏右侧内容
        updateNavBarRight({ contents, action, callBack, isShow }: { contents?: string | Component; action?: "share" | "other"; callBack?: (() => Promise<boolean | void>) | null; isShow?: boolean }) {
            this.navBarInfo.right.contents = contents ?? this.navBarInfo.right.contents;
            this.navBarInfo.right.action = action ?? this.navBarInfo.right.action;
            this.navBarInfo.right.callBack = callBack ?? this.navBarInfo.right.callBack;
            this.navBarInfo.right.isShow = isShow ?? this.navBarInfo.right.isShow;
            this.navBarInfo.isDefaultState = false;
        }
    }
});

import type { Component } from "vue";

export interface NavBarInfo {
    /** 是否显示导航栏 */
    isShow: boolean;
    /** 是否为默认导航栏内容状态，比如返回按钮是否显示、右边展示了一个设置按钮，等到下一个页面的时候要恢复到默认值状态 */
    isDefaultState: boolean;
    left: {
        // 是否显示左侧内容
        isShow: boolean;
        // 左侧内容
        contents: string | Component;
        /** 点击回调函数, 如果返回false, 则不执行默认返回操作 */
        callBack: (() => Promise<boolean | void>) | null;
    };
    center: {
        // 是否显示中心内容
        isShow: boolean;
        // 中心内容
        contents: string | Component;
        /** 点击回调函数 */
        callBack: (() => Promise<boolean | void>) | null;
    };
    right: {
        // 是否显示右侧内容
        isShow: boolean;
        // 右侧内容操作类型
        action: "share" | "other";
        // 右侧内容
        contents: string | Component;
        /** 点击回调函数 */
        callBack: (() => Promise<boolean | void>) | null;
    };
}

// 默认导航栏信息
export const getDefaultNavBarInfo = function () {
    return <NavBarInfo>{
        isShow: true,
        isDefaultState: true,
        left: {
            isShow: true,
            contents: "<i class='icon-arrow-left'></i><span>返回</span>",
            callBack: null
        },
        center: {
            isShow: true,
            contents: "标题",
            callBack: null
        },
        right: {
            isShow: true,
            action: "other",
            contents: "",
            callBack: null
        }
    };
};

// 此文件不支持热更新，修改后需要重启生效
import mobile from "postcss-mobile-forever";
import autoprefixer from "autoprefixer";

export default {
    plugins: [
        autoprefixer(),
        // https://github.com/wswmsword/postcss-mobile-forever
        mobile({
            appSelector: "#app",
            viewportWidth: 375,
            // maxDisplayWidth: 600,
            mobileUnit: "rem",
            // 不转换的属性值列表
            // valueBlackList: ["1px solid"],
            // 需要转换的 fixed 选择器列表
            rootContainingBlockSelectorList: [
                ".van-tabbar",
                ".van-popup",
                ".van-popup--bottom",
                ".van-popup--top",
                ".van-popup--left",
                ".van-popup--right"
                // 在这里添加你的选择器
            ]
        })
    ]
};

/*
 * @创建者: yujinjin9@126.com
 * @描述：封装第三方加载插件，由于Loading的加载是单例的，所以这里要做到如果被多次调用显示，以最后一次的close才真正关闭
 */
import { showLoadingToast, type ToastOptions, type ToastWrapperInstance } from "vant";
import "vant/es/toast/style";
import logs from "@/services/logs";

let loadingInstance: null | ToastWrapperInstance = null;
let showTimes = 0;

export default {
    show(options?: ToastOptions) {
        ++showTimes;
        logs.debug(showTimes, "showLoading");
        loadingInstance = showLoadingToast(
            Object.assign(
                {
                    duration: 0,
                    forbidClick: true,
                    overlay: true,
                    message: "加载中..."
                },
                options
            )
        );
    },

    hide() {
        --showTimes;
        if (showTimes < 0) {
            logs.debug("hideLoading次数异常，当前showTimes：" + showTimes);
            showTimes = 0;
        }
        if (loadingInstance && showTimes <= 0) {
            loadingInstance.close();
            loadingInstance = null;
        }
    }
};

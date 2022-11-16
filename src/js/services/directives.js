/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2022-10-25 20:12:04
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2022-10-25 20:31:00
 * @项目的路径: \360-manager-H5\src\js\services\directives.js
 * @描述: 自定义指令
 */
import { dataStore } from "@js/stores/";
import { storeToRefs } from "pinia";

export default {
    // 用户操作权限指令
    permission: function (el, binding) {
        if (!binding.value) {
            return;
        }
        const { pageName, value } = binding.value;
        if (!value) {
            return;
        }
        const store = dataStore();
        const { buttonPermissions } = storeToRefs(store);
        el.style.display = buttonPermissions[pageName] && buttonPermissions[pageName].includes(value) ? "" : "none";
    }
};

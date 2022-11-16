/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2022-10-25 20:15:50
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2022-10-25 20:18:45
 * @项目的路径: \360-manager-H5\src\js\stores\data.js
 * @描述: 头部注释配置模板
 */
import { defineStore } from "pinia";

export default defineStore("data", {
    state: () => {
        return {
            // 按钮操作权限
            buttonPermissions: {}
        };
    }
});

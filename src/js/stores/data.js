/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2022-10-25 20:15:50
 * @描述: 站点数据状态管理

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

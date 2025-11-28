/*
 * @创建者: yujinjin9@126.com
 * @描述: app数据管理入口文件
 */
import { defineStore } from "pinia";

interface LocationInfo {
    /** 是否显示侧边栏 */
    isLoading: boolean;
}

export default defineStore("data", {
    state: () => ({
        /* 站点临时数据*/
        locationInfo: <LocationInfo>{
            isLoading: true
        },
        /** 保持路由缓存的名称列表（注意：该名称必须要定义defineOptions的name属性才会生效） */
        keepAliveRouteNames: [] as Array<string>,
        /** 路由切换方向 */
        routeDirection: "forward" as "forward" | "back"
    }),
    actions: {
        //修改站点临时数据
        updateLocationInfo(data: Array<{ key: keyof LocationInfo; value: LocationInfo[keyof LocationInfo] }>) {
            data.forEach(item => {
                this.locationInfo[item.key] = item.value;
            });
        },
        // 批量更新当前站点临时数据
        batchUpdateLocationInfo({ key, value }: { key: keyof LocationInfo; value: LocationInfo[keyof LocationInfo] }) {
            this.locationInfo[key] = value;
        },
        // 添加缓存的路由名称
        addKeepAliveRouteName(routeName: string) {
            if (!this.keepAliveRouteNames.includes(routeName)) {
                this.keepAliveRouteNames.push(routeName);
            }
        },
        // 删除缓存的路由名称
        deleteKeepAliveRouteName(routeName: string) {
            const findIndex = this.keepAliveRouteNames.indexOf(routeName);
            if (findIndex !== -1) {
                this.keepAliveRouteNames.splice(findIndex, 1);
            }
        },
        // 设置路由切换方向
        setRouteDirection(direction: "forward" | "back") {
            this.routeDirection = direction;
        }
    }
});

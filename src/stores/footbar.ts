/**
 * @创建者: yujinjin9@126.com
 * @描述: App底部栏数据管理
 */

import { defineStore } from "pinia";

export default defineStore("footbar", {
    state: () => ({
        isShow: true,
        //购物车数量
        shoppingCartCount: 0
    }),
    actions: {
        // 更新购物车数量
        updateShoppingCartCount(count: number) {
            this.shoppingCartCount = count;
        },
        // 修改底部栏显示状态
        updateFootBarShowState(isShow: boolean) {
            this.isShow = isShow;
        }
    }
});

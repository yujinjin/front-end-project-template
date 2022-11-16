/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2022-10-21 17:43:58
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2022-10-24 14:03:39
 * @项目的路径: \360-manager-H5\src\js\stores\storage.js
 * @描述: 本地存储数据管理
 */
import { defineStore } from "pinia";
import localStorage from "@js/services/local-storage";

export default defineStore("events", {
    // 把本地存储放在缓存里的数据
    state: () => {
        return {
            // 示例数据1(简单获取)
            exampleData1: localStorage.getValue(1, "exampleData1"),
            // 示例数据3(带有过期时间，需要走getters判断)
            exampleData3: localStorage.getValue(0, "exampleData3")
        };
    },
    // 直接获取本地存储数据
    getters: {
        // 示例数据1(简单获取)
        // TODO: 验证getters没有调用state情况下的数据
        exampleData2: function () {
            return localStorage.getValue(0, "exampleData2");
        },
        // 获取示例数据3，判断本地存储的数据是否过期
        // TODO: 验证getters和state同名的情况
        exampleData3: function (state) {
            if (state.exampleData3 && state.exampleData3.expiredTime > new Date().getTime()) {
                return state.exampleData3.value;
            }
            return null;
        },
        // 获取示例数据4，判断本地存储的数据是否过期(这里不做缓存)
        exampleData4: function () {
            const exampleData4 = localStorage.getValue(0, "exampleData4");
            if (exampleData4 && exampleData4.expiredTime > new Date().getTime()) {
                return exampleData4.value;
            }
            return null;
        }
    },
    actions: {
        // 存储示例数据1-简单存储, 如果value 为 undefined|''|null时会删除本地存储
        setExampleData1(value) {
            if (value === undefined) {
                value = null;
            }
            this.exampleData1 = value;
            localStorage.setValue(1, "exampleData1", value);
        },
        // 存储示例数据2-简单存储, 如果value 为 undefined|''|null时会删除本地存储
        setExampleData2(value) {
            if (value === undefined) {
                value = null;
            }
            this.exampleData2 = value;
            localStorage.setValue(0, "exampleData2", value);
        },
        // 存储示例数据3-加入过期时间, 如果value 为 undefined|''|null时会删除本地存储
        setExampleData3(value) {
            if (value === undefined || value === null || value === "") {
                localStorage.setValue(0, "exampleData3");
                this.setExampleData3 = null;
            } else {
                // 这里预期存储时间为1天， 也可根据实际业务需求传参方式添加
                this.setExampleData3 = { value, expiredTime: new Date().getTime() + 24 * 60 * 60 * 1000 };
                localStorage.setValue(0, "setExampleData3", this.setExampleData3);
            }
        },
        // 存储示例数据4-加入过期时间(这里不做缓存), 如果value 为 undefined|''|null时会删除本地存储
        setExampleData4(value) {
            if (value === undefined || value === null || value === "") {
                localStorage.setValue(0, "exampleData4");
            } else {
                // 这里预期存储时间为1天， 也可根据实际业务需求传参方式添加
                localStorage.setValue(0, "setExampleData4", {
                    value,
                    expiredTime: new Date().getTime() + 24 * 60 * 60 * 1000
                });
            }
        }
    }
});

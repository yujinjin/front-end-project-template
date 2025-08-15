/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2022-10-21 16:55:33
 * @描述: 事件管理
 */
import { defineStore } from "pinia";

export default defineStore("events", {
    state: () => {
        return {
            events: {},
            onceEvents: {}
        };
    },
    actions: {
        on({ eventName, callback }) {
            if (this.events[eventName]) {
                this.events[eventName] = [];
            }
            this.events[eventName].push(callback);
        },
        // 只绑定一次事件
        once({ eventName, callback }) {
            if (!this.onceEvents[eventName]) {
                this.onceEvents[eventName] = [];
            }
            this.onceEvents[eventName].push(callback);
        },
        off({ eventName, callback }) {
            let callbacks = this.events[eventName];
            if (callbacks) {
                callbacks.find(function (value, index) {
                    if (value === callback) {
                        callbacks.splice(index, 1);
                        return true;
                    }
                });
            }
            callbacks = this.onceEvents[eventName];
            if (callbacks) {
                callbacks.find(function (value, index) {
                    if (value === callback) {
                        callbacks.splice(index, 1);
                        return true;
                    }
                });
            }
        },

        trigger({ eventName, args }) {
            let callbacks = this.events[eventName];
            if (callbacks && callbacks.length > 0) {
                for (let i = 0; i < callbacks.length; i++) {
                    callbacks[i].apply(this, args);
                }
            }
            callbacks = this.onceEvents[eventName];
            if (callbacks && callbacks.length > 0) {
                for (let i = 0; i < callbacks.length; i++) {
                    callbacks[i].apply(this, args);
                }
                delete this.onceEvents[eventName];
            }
        }
    }
});

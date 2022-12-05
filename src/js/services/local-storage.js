/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2022-10-21 17:18:53
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2022-12-05 14:32:56
 * @项目的路径: \front-end-project-template\src\js\services\local-storage.js
 * @描述: 浏览器本地存储操作
 */

// 本地存储的应用名称
const localStorageName = config.appName + "Storage";

/**
 * 本地存储操作
 * @param type 存储类型 0: localStorage, 1: sessionStorage
 * @param value 存储的值，如果值为undefined表示获取${localStorageName}值，为null或者''时表示删除
 */
const storeUp = function (type = 0, value) {
    if (!window) {
        alert("您开启了秘密浏览或无痕浏览模式，请关闭!");
        return;
    }
    const storage = type === 0 ? window.localStorage : window.sessionStorage;
    if (!storage) {
        alert("您开启了秘密浏览或无痕浏览模式，请关闭!");
        return;
    }
    if (value === undefined) {
        return storage.getItem(localStorageName);
    } else if (value === null || value === "") {
        storage.removeItem(localStorageName);
    } else {
        storage.setItem(localStorageName, value);
    }
};

export default {
    /**
     * 根据key值获取本地存储信息
     * @param key 存储业务对象key值，如果不传返回整个站点存储对象
     */
    getValue(type = 0, key) {
        // 获取本地存储内容
        const localStorageContents = storeUp(type);
        // 返回站点存储的对象
        let localStorageObject = {};
        if (localStorageContents) {
            try {
                localStorageObject = JSON.parse(localStorageContents);
            } catch (error) {
                logs.warn(error, localStorageContents);
            }
        }
        if (key) {
            return localStorageObject[key];
        } else {
            return localStorageObject;
        }
    },

    /**
     * 根据key值设置本地存储信息
     * @param key 存储业务对象key值
     * @param value 存储的业务对象value值, undefined|''|null时表示删除
     */
    setValue(type = 0, key, value) {
        const localStorageContents = storeUp(type);
        // 返回站点存储的对象
        let localStorageObject = {};
        if (localStorageContents) {
            try {
                localStorageObject = JSON.parse(localStorageContents);
            } catch (error) {
                logs.warn(error, localStorageContents);
            }
        }
        if (value === undefined || value === null || value === "") {
            if (Object.keys(localStorageObject).includes(key)) {
                delete localStorageObject[key];
            }
        } else {
            localStorageObject[key] = value;
        }
        storeUp(type, JSON.stringify(localStorageObject));
    }
};

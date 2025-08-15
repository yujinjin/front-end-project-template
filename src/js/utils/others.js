/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2022-10-25 11:02:37
 * @描述: 其他常用小工具
 */
// 设置 object对象中对应 path 属性路径上的值，如果path不存在，则创建。 缺少的索引属性会创建为数组，而缺少的属性会创建为对象。
export const setObjectProperty = function (object, path, value) {
    if (!path) {
        throw "path 属性路径上的值不能为空";
    } else if (!object || typeof object !== "object") {
        throw "设置的目标必须是对象类型";
    }
    let keyArray = [];
    if (typeof path == "string") {
        //将a[b].c转换为a.b.c
        path = path.replace(/\[(\w+)\]/g, ".$1");
        path = path.replace(/^\./, "");
        //将.a.b转换为a.b
        keyArray = path.split(".");
    } else if (path instanceof Array) {
        keyArray = path;
    } else {
        throw "path 属性路径只能为字符串类型或数组类型";
    }
    if (keyArray.length == 1) {
        object[keyArray[0]] = value;
        return { rootObject: { [keyArray[0]]: value } };
    }
    const getValue = function (targetObject, key, isArray) {
        let value = targetObject[key];
        if (value == undefined || value == null || typeof value != "object") {
            targetObject[key] = value = isArray ? [] : {};
        }
        return value;
    };

    let targetValue = getValue(object, keyArray[0], /^\d+$/.test(keyArray[1]));
    let rootName = keyArray[0];
    let rootValue = targetValue;
    for (let i = 1; i < keyArray.length - 1; i++) {
        targetValue = getValue(targetValue, keyArray[i], /^\d+$/.test(keyArray[i + 1]));
    }
    targetValue[keyArray[keyArray.length - 1]] = value;
    return { rootObject: { [rootName]: rootValue } };
};

// 根据 object对象的path路径获取值。 如果解析 value 是 undefined 会以 defaultValue 取代。
export const getObjectProperty = function (object, path, defaultValue) {
    if (!path) {
        throw "path 属性路径上的值不能为空";
    } else if (!object || typeof object !== "object") {
        throw "获取的目标必须是对象类型";
    }
    let keyArray = [];
    if (typeof path == "string") {
        //将a[b].c转换为a.b.c
        path = path.replace(/\[(\w+)\]/g, ".$1");
        path = path.replace(/^\./, "");
        //将.a.b转换为a.b
        keyArray = path.split(".");
    } else if (path instanceof Array) {
        keyArray = path;
    } else {
        throw "path 属性路径只能为字符串类型或数组类型";
    }
    let targetValue = object;
    for (let i = 0; i < keyArray.length; i++) {
        if (Object.prototype.hasOwnProperty.call(targetValue, keyArray[i])) {
            targetValue = targetValue[keyArray[i]];
            if (targetValue == null) return null;
        } else {
            targetValue = undefined;
        }
        if (targetValue == undefined) {
            return defaultValue;
        }
    }
    return targetValue;
};

/**
 * 函数节流，提升性能
 * @param {function} func 要执行的函数（不能是匿名函数）
 * @param {number} wait 函数执行的最小间隔
 * @param {object} options {leading: true,trailing: true}
 * @return {function} 查看文档 http://www.bootcss.com/p/underscore/#throttle
 * @example let cb=app.utils.throttle(fnName,250); window.addEventListener('scroll', cb, false); ;
 */
export function throttle(func, wait, options) {
    let context, args, result;
    let timeout = null;
    let previous = 0;
    if (!options) options = {};
    let later = function () {
        previous = options.leading === false ? 0 : Date.now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };
    return function () {
        let now = Date.now();
        if (!previous && options.leading === false) previous = now;
        let remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
}

/**
 *
 * 函数防抖
 * @param {Function} callback 执行的函数
 * @param {Number} wait 等待的时间
 * @returns Function
 */
export function debounce(callback, wait) {
    let timeout;
    return function () {
        const context = this; // 保存this指向
        const args = arguments; // 拿到event对象
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            callback.apply(context, args);
        }, wait);
    };
}

/**
 * 休眠
 * @param {Number} time 休眠时间(单位：毫秒)
 * @returns
 */
export function sleep(time) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

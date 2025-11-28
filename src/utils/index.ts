/**
 * @创建者: yujinjin9@126.com
 * @描述: 随机生成数据
 */

/**
 * 生成32的字符串，每一位都是随机的16进制数，重复的概率是1/(16^32)
 */
export function guid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
        .replace(/[xy]/g, function (c) {
            const r = (Math.random() * 16) | 0;
            const v = c === "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        })
        .toUpperCase();
}

/*
 * 生成id随机数(年月日+8位随机数)
 */
export function randomId() {
    const currentDate = new Date();
    let randomId = "xxxxxxxx".replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0,
            v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
    randomId =
        currentDate.getFullYear() +
        "" +
        (currentDate.getMonth() > 8 ? currentDate.getMonth() + 1 : "0" + (1 + currentDate.getMonth())) +
        "" +
        (currentDate.getDate() > 9 ? currentDate.getDate() : "0" + currentDate.getDate()) +
        randomId;
    return randomId;
}

// 中国手机号码验证
export function chinaPhoneNumberValidate(phoneNumber: string): boolean {
    return !!phoneNumber && /^1[0-9]{10}$/.test(phoneNumber.replace(/\s/g, ""));
}

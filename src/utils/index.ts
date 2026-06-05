/*
 * @创建者: yujinjin9@126.com
 * @描述: 常用工具方法
 */
import { type ComponentObjectPropsOptions } from "vue";

export * from "./validation";
export * from "./extend";
export * from "./format";
export * from "./generate";
export * from "./url";
export * from "./others";

// 特殊字符替换
export function escapeStringRegexp(string = "") {
    return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}

/**
 * 构建并冻结组件属性对象。
 * @param props (T): 组件的属性对象，类型为 ComponentObjectPropsOptions 的子类型
 * @returns  Readonly<T>: 返回一个冻结的、只读的属性对象
 * @example const myProps = buildProps({ name: 'John', age: 30 });
 * myProps.name = 'Jane'; // 尝试修改属性将导致错误
 */
export function buildProps<T extends ComponentObjectPropsOptions>(props: T) {
    return Object.freeze({ ...props }) as Readonly<T>;
}

/**
 * 检查给定的值是否为字符串类型
 * @param value(any): 需要检查的值
 * @returns boolean: 如果值是字符串类型则返回true，否则返回false
 */
export function isString(value: any): value is string {
    return typeof value === "string";
}

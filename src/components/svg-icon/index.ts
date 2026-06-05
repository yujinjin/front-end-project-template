/*
 * @创建者: yujinjin9@126.com
 * @描述: svg icon 组件
 */
import SvgIcon from "./svg-icon.vue";
import type SvgIconType from "./svg-icon.vue";

export * from "./svg-icon.ts";

// 支持手动单独导入（SvgIcon）
export { SvgIcon };

export default SvgIcon;

// TODO: 该组件不要实例，这里只做个测试
export type SvgIconInstance = InstanceType<typeof SvgIconType>;

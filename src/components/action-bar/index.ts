/*
 * @创建者: yujinjin9@126.com
 * @描述: action-bar组件入口
 */
import ActionBar from "./action-bar.vue";
import type ActionBarType from "./action-bar.vue";

export * from "./action-bar.ts";

export { ActionBar };

export default ActionBar;

export type ActionBarInstance = InstanceType<typeof ActionBarType>;

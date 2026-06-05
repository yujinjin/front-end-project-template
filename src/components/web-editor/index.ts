/*
 * @创建者: yujinjin9@126.com
 * @描述: web-editor组件
 */
import WebEditor from "./web-editor.vue";
import type WebEditorType from "./web-editor.vue";

export * from "./web-editor.ts";

export { WebEditor };

export default WebEditor;

export type WebEditorInstance = InstanceType<typeof WebEditorType>;

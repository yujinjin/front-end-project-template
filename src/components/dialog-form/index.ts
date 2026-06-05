/*
 * @创建者: yujinjin9@126.com
 * @描述: dialog-form 组件入口
 */
import DialogForm from "./dialog-form.vue";
import type DialogFormType from "./dialog-form.vue";

export * from "./dialog-form.ts";

export { DialogForm };

export default DialogForm;

export type DialogFormInstance = InstanceType<typeof DialogFormType>;

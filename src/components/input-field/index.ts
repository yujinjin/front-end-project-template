/*
 * @创建者: yujinjin9@126.com
 * @描述: input-field组件入口
 */
import InputField from "./input-field.vue";
import type InputFieldType from "./input-field.vue";

export * from "./input-field.ts";

export { InputField };

export default InputField;

export type InputFieldInstance = InstanceType<typeof InputFieldType>;

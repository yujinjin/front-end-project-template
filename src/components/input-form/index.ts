/*
 * @创建者: yujinjin9@126.com
 * @描述: input-form组件入口
 */
import InputForm from "./input-form.vue";
import type InputFormType from "./input-form.vue";

export * from "./input-form.ts";

export { InputForm };

export default InputForm;

export type InputFormInstance = InstanceType<typeof InputFormType>;

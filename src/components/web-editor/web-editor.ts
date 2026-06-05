/*
 * @创建者: yujinjin9@126.com
 * @描述: web 富文本框编辑器属性、事件声明
 */
import { type PropType, type ExtractPublicPropTypes } from "vue";
import { buildProps, isString } from "@/utils/index";
import { type NotReadonly } from "/#/global";

export type OnImgUploadFunction = (file: any) => Promise<string> | string;

export const webEditorProps = buildProps({
    modelValue: String,
    disabled: {
        type: Boolean,
        default: null
    },
    onImgUpload: {
        type: Function as PropType<OnImgUploadFunction>
    }
});

export type WebEditorProps = NotReadonly<ExtractPublicPropTypes<typeof webEditorProps>>;

export const webEditorEmits = {
    "update:modelValue": (value: string) => isString(value)
};

export type WebEditorEmits = typeof webEditorEmits;

/*
 * @创建者: yujinjin9@126.com
 * @描述: checkselect 组件
 */
import { type PropType, type ExtractPublicPropTypes } from "vue";
import { buildProps } from "@/utils/index";
import { type NotReadonly } from "/#/global";

export const checkSelectProps = buildProps({
    data: {
        type: Array as PropType<Array<Record<string, any> | string | number>>,
        required: true
    },
    optionValueKey: {
        type: String,
        default: "value"
    },
    optionLabelKey: {
        type: String,
        default: "label"
    },
    props: {
        type: Object as PropType<Record<string, any>>,
        default: () => ({})
    },
    events: {
        type: Object as PropType<Record<string, (...args: any[]) => any>>,
        default: () => ({})
    }
});

export type CheckSelectProps = NotReadonly<ExtractPublicPropTypes<typeof checkSelectProps>>;

export const checkSelectEmits = {
    change: (value: Array<object | string | number>) => Array.isArray(value)
};

export type CheckSelectEmits = typeof checkSelectEmits;

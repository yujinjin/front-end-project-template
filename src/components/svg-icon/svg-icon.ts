/*
 * @创建者: yujinjin9@126.com
 * @描述: svg icon
 */

import { type ExtractPublicPropTypes, type PropType, type Component } from "vue";
import { buildProps } from "@/utils/index";
import { type NotReadonly } from "/#/global";

export const svgIconProps = buildProps({
    // svg的link名称
    value: {
        type: [String, Object] as PropType<string | Component>,
        default: ""
    },
    color: {
        type: String,
        default: ""
    },
    size: {
        type: [String, Number] as PropType<string | number>,
        default: ""
    }
});

export type SvgIconProps = NotReadonly<ExtractPublicPropTypes<typeof svgIconProps>>;

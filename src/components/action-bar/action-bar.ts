/*
 * @创建者: yujinjin9@126.com
 * @描述: action-bar组件入口
 */
import { type PropType, type ExtractPublicPropTypes, type Component } from "vue";
import { type ButtonProps } from "element-plus";
import { buildProps } from "@/utils/index";
import { type NotReadonly } from "/#/global";

export type ActionButton = NotReadonly<Partial<ButtonProps>> & {
    /** 当前按钮操作CODE */
    handleCode?: string;

    /** 按钮文案内容 */
    contents?: string;

    /** 自定义插槽名称（如有值其他选项无效） */
    slot?: string;

    /** 自定义图标 */
    customIcon?: string | Component;

    /** 按钮是否正在加载 */
    // isLoading?: boolean;

    /** 是否显示(通过当前固定展示数目来判断是否展示) */
    isShow?: boolean;

    /** 按钮点击函数事件 */
    click?: (selectRows: Array<any>, button: ActionButton) => Promise<void> | void;
};

export type ActionButtonSlotScope = {
    button: ActionButton;
};

/** 列表操作栏实例 */
export interface ActionBarRef {
    /** 修改当前生成的button按钮值 */
    changeButtons: (callback: (actionButtons: ActionButton[]) => void) => void;
}

export const actionBarProps = buildProps({
    buttons: {
        type: Array as PropType<ActionButton[]>,
        default: function () {
            return [];
        }
    },
    // 当前选中的行数据列表
    selectRows: {
        type: Array,
        default: function () {
            return [];
        }
    },
    // 按钮默认位置,该位置会影响默认插槽内容
    align: {
        type: String as PropType<"center" | "left" | "right">,
        default: "left"
    }
});

export type ActionBarProps = NotReadonly<ExtractPublicPropTypes<typeof actionBarProps>>;

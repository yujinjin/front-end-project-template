/**
 * 作者：yujinjin9@126.com
 * 时间：2022-04-24
 * 描述：按钮数据权限
 */
import { HANDLE_CODES } from "@js/services/constants";
import { dataStore } from "@js/stores/";
// import { ElMessage } from "element-plus";

// 所有的页面按钮列表（参考用）
const ALL_PAGE_BUTTONS = {
    // 普通页面
    CommonDemo: [
        HANDLE_CODES.CREATE, // 新增
        HANDLE_CODES.DOWNLOAD, // 导出
        HANDLE_CODES.UPDATE, //编辑
        HANDLE_CODES.DELETE, //删除
        HANDLE_CODES.ONSHELF, //启动
        HANDLE_CODES.OFFSHELF, //暂停
        HANDLE_CODES.SUBMIT, //提交
        HANDLE_CODES.RESET, //撤回
        HANDLE_CODES.SUPPLEMENT, //变更素材
        HANDLE_CODES.BATCHSUBMIT, //批量提交
        HANDLE_CODES.BATCHRESET, //批量撤回
        HANDLE_CODES.BATCHAUTH, //批量授权
        HANDLE_CODES.BATCHUPDATE, //批量修改
        HANDLE_CODES.COPY, //复制
        HANDLE_CODES.MONITOR, //监控
        HANDLE_CODES.SEARCHEXAMINE // 审核详情
    ]
};
// 角色权限配置
// NEW_PLATFORM_DEV=开发人员，权限都有，产品角色名=平台管理员
// NEW_PLATFORM_MANAGER=管理，权限都有，产品角色名=平台管理员
// NEW_PLATFORM_OPERATION_PEOPLE=运营人员，产品角色名=运营人员
// NEW_PLATFORM_AUDITOR=审核人员，产品角色名=消保审核人员，合规审核人员
const ROLE_BUTTON_PERMISSIONS = {
    // 开发人员，权限都有，产品角色名=平台管理员
    NEW_PLATFORM_DEV: ALL_PAGE_BUTTONS,
    // 管理，权限都有，产品角色名=平台管理员
    NEW_PLATFORM_MANAGER: ALL_PAGE_BUTTONS,
    // 运营人员，产品角色名=运营人员
    NEW_PLATFORM_OPERATION_PEOPLE: {
        // 展现计划-计划列表
        CommonDemo: [
            HANDLE_CODES.CUSTOM, // 自定义列
            HANDLE_CODES.CREATE, // 新增
            HANDLE_CODES.DOWNLOAD, // 导出
            HANDLE_CODES.UPDATE, //编辑
            HANDLE_CODES.DELETE, //删除
            HANDLE_CODES.ONSHELF, //启动
            HANDLE_CODES.OFFSHELF, //暂停
            HANDLE_CODES.SUBMIT, //提交
            HANDLE_CODES.RESET, //撤回
            HANDLE_CODES.SUPPLEMENT, //变更素材
            HANDLE_CODES.BATCHSUBMIT, //批量提交
            HANDLE_CODES.BATCHRESET, //批量撤回
            HANDLE_CODES.BATCHAUTH, //批量授权
            HANDLE_CODES.COPY, //复制
            HANDLE_CODES.MONITOR, //监控
            HANDLE_CODES.SEARCHEXAMINE // 审核详情
        ]
    },
    // 审核人员，产品角色名=消保审核人员，合规审核人员
    NEW_PLATFORM_AUDITOR: {
        CommonDemo: [
            HANDLE_CODES.DOWNLOAD, // 导出
            HANDLE_CODES.MONITOR, //监控
            HANDLE_CODES.SEARCHEXAMINE // 审核详情
        ]
    }
};

// 角色按钮权限配置
export default async function () {
    // 查询角色信息列表
    // const { flag, data, msg } = await queryCurrentLoginUserRoleList();
    // if (flag !== "S") {
    //     ElMessage({
    //         showClose: true,
    //         message: msg || "服务查询角色信息异常",
    //         type: "error"
    //     });
    //     return;
    // } else if (!data || data.length === 0) {
    //     return;
    // }
    const data = ["NEW_PLATFORM_MANAGER", "NEW_PLATFORM_OPERATION_PEOPLE", "NEW_PLATFORM_AUDITOR"];
    // 当前登录用户的权限信息
    const permission = {};
    data.forEach(role => {
        if (ROLE_BUTTON_PERMISSIONS[role]) {
            Object.keys(ROLE_BUTTON_PERMISSIONS[role]).forEach(pageName => {
                if (permission[pageName]) {
                    ROLE_BUTTON_PERMISSIONS[role][pageName].forEach(buttonKey => {
                        if (!permission[pageName].includes(buttonKey)) {
                            permission[pageName].push(buttonKey);
                        }
                    });
                } else {
                    permission[pageName] = ROLE_BUTTON_PERMISSIONS[role][pageName].map(item => item);
                }
            });
        }
    });
    const store = dataStore();
    store.$patch({
        buttonPermissions: permission
    });
}

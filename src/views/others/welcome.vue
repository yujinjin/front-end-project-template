<!--
 * @创建者: yujinjin9@126.com
 * @描述: 欢迎页面
-->
<template>
    <div class="welcome">
        <img alt="Vue logo" src="/logo.png" />
        <h2>{{ loginUserInfo.userName }}，</h2>
        <h3>{{ civilityText }}，欢迎来到中台管理系统</h3>
        <div class="quick-links">
            <div v-for="link in quickLinks" :key="link.name" class="link-card" @click="router.push(link.path)">
                <i :class="link.icon"></i>
                <span class="link-title">{{ link.title }}</span>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import dayjs from "dayjs";
import { storageStore } from "@/stores";

defineOptions({
    name: "welcome"
});

const router = useRouter();

const dataStorages = storageStore();

// 登录用户信息
const loginUserInfo = dataStorages.loginUserInfo;

// 问候语
const civilityText = computed(() => {
    const hour = dayjs().hour();
    if (hour < 6) {
        return "现在是凌晨" + hour + "点了";
    } else if (hour < 10) {
        return "早上好";
    } else if (hour < 14) {
        return "中午好";
    } else if (hour < 18) {
        return "下午好";
    } else if (hour < 22) {
        return "晚上好";
    }
    return "夜深了现在是晚上" + hour + "点";
});

// 快捷链接列表
const quickLinks = [
    { name: "play-cache", path: "/play/cache", icon: "icomoon-floppy-disk", title: "缓存路由测试" },
    { name: "play-details", path: "/play/details", icon: "icomoon-eye", title: "详情页路由测试" },
    { name: "play-icon-list", path: "/play/icon-list", icon: "icomoon-image", title: "图标列表" },
    { name: "play-order-list", path: "/play/order-list", icon: "icomoon-cart", title: "订单列表查询" }
];
</script>
<style lang="scss" scoped>
.welcome {
    text-align: center;
}

.quick-links {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
    margin-top: 32px;
    padding: 0 20px;

    .link-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 120px;
        height: 100px;
        border: 1px solid var(--el-border-color);
        border-radius: var(--el-border-radius-base);
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
            background-color: var(--el-color-primary-light-9);
            border-color: var(--el-color-primary);
            transform: translateY(-2px);
        }

        i {
            font-size: 24px;
            color: var(--el-text-color-primary);
        }

        .link-title {
            margin-top: 10px;
            font-size: 13px;
            color: var(--el-text-color-primary);
        }

        &:hover i,
        &:hover .link-title {
            color: var(--el-color-primary);
        }
    }
}
</style>

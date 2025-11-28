<template>
    <div class="user-container">
        <div class="content-wrapper">
            <!-- 用户信息卡片 -->
            <div class="user-info-card">
                <div class="user-avatar">
                    <van-image round src="https://img.yzcdn.cn/vant/cat.jpeg" fit="cover" width="64" height="64" />
                </div>
                <div class="user-details">
                    <h2 class="user-name">{{ userName }}</h2>
                    <p class="user-level">普通用户</p>
                </div>
                <van-icon name="arrow-right" class="card-arrow" />
            </div>

            <!-- 统计数据 -->
            <div class="stats-section">
                <div class="stat-item">
                    <div class="stat-number">{{ orderCount }}</div>
                    <div class="stat-label">我的订单</div>
                </div>
                <div class="stat-divider"></div>
                <div class="stat-item">
                    <div class="stat-number">{{ messageCount }}</div>
                    <div class="stat-label">消息通知</div>
                </div>
                <div class="stat-divider"></div>
                <div class="stat-item">
                    <div class="stat-number">{{ favoriteCount }}</div>
                    <div class="stat-label">我的收藏</div>
                </div>
            </div>

            <!-- 功能列表 -->
            <div class="feature-section">
                <van-cell-group>
                    <van-cell v-for="(item, index) in userFeatures" :key="index" :title="item.title" :icon="item.icon" is-link @click="handleFeatureClick(item)" class="feature-cell"></van-cell>
                </van-cell-group>
            </div>

            <!-- 设置和帮助 -->
            <div class="setting-section">
                <van-cell-group>
                    <van-cell title="设置" icon="setting-o" is-link @click="handleSettingClick" class="setting-cell" />
                    <van-cell title="帮助与反馈" icon="envelop-o" is-link @click="handleHelpClick" class="setting-cell" />
                    <van-cell title="关于我们" icon="info-o" is-link @click="handleAboutClick" class="setting-cell" />
                </van-cell-group>
            </div>

            <!-- 退出登录按钮 -->
            <div class="logout-section">
                <van-button type="default" block @click="handleLogout" class="logout-button">退出登录</van-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { showToast, Icon as VanIcon, Image as VanImage, Cell as VanCell, CellGroup as VanCellGroup, Button as VanButton } from "vant";
import { useEventsStore } from "@/stores/index";
import "vant/es/icon/style";
import "vant/es/toast/style";
import "vant/es/image/style";
import "vant/es/cell/style";
import "vant/es/cell-group/style";
import "vant/es/button/style";

const eventsStore = useEventsStore();

const router = useRouter();

// 用户信息
const userName = ref("演示用户");
const orderCount = ref("0");
const messageCount = ref("2");
const favoriteCount = ref("5");

// 个人中心功能列表
const userFeatures = [
    { title: "我的订单", icon: "orders-o", key: "orders" },
    { title: "地址管理", icon: "location-o", key: "address" },
    { title: "我的收藏", icon: "star-o", key: "favorite" },
    { title: "优惠券", icon: "coupon-o", key: "coupon" }
];

// 处理功能点击
const handleFeatureClick = (item: (typeof userFeatures)[0]) => {
    showToast(`${item.title} 功能开发中`);
};

// 处理设置点击
const handleSettingClick = () => {
    showToast("设置功能开发中");
};

// 处理帮助点击
const handleHelpClick = () => {
    showToast("帮助与反馈功能开发中");
};

// 处理关于我们点击
const handleAboutClick = () => {
    router.push({ name: "about" });
};

// 处理退出登录
const handleLogout = () => {
    showToast("退出登录成功");
    eventsStore.trigger({ eventName: "logout" });
    // 这里可以添加实际的退出登录逻辑
    // 例如清除token、跳转到登录页等
    // router.push('/login');
};
</script>

<style scoped lang="scss">
.user-container {
    min-height: 100vh;
    background-color: #f5f5f5;
}
// 用户信息卡片样式
.user-info-card {
    background: linear-gradient(135deg, #1890ff 0%, #36cfc9 100%);
    padding: 20px;
    display: flex;
    align-items: center;
    color: #fff;
}

.user-avatar {
    margin-right: 15px;
    position: relative;
}

.user-details {
    flex: 1;
}

.user-name {
    font-size: 18px;
    font-weight: 600;
    margin: 0 0 5px 0;
}

.user-level {
    font-size: 14px;
    opacity: 0.9;
    margin: 0;
}

.card-arrow {
    font-size: 20px;
    opacity: 0.8;
}

// 统计数据样式
.stats-section {
    background-color: #fff;
    margin-top: 10px;
    padding: 15px 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.stat-item {
    flex: 1;
    text-align: center;
}

.stat-number {
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin-bottom: 5px;
}

.stat-label {
    font-size: 12px;
    color: #666;
}

.stat-divider {
    width: 1px;
    height: 30px;
    background-color: #f0f0f0;
}

// 功能区域样式
.feature-section,
.setting-section {
    background-color: #fff;
    margin-top: 10px;
    padding: 0;
}

.feature-cell,
.setting-cell {
    --van-cell-line-height: 2;
    --van-cell-font-size: 15px;
    --van-cell-left-icon-color: #1890ff;
}

// 退出登录按钮样式
.logout-section {
    padding: 20px 15px;
}

.logout-button {
    --van-button-default-border-color: #1890ff;
    --van-button-default-color: #1890ff;
    --van-button-border-radius: 8px;
}

// 响应式调整
@media screen and (max-width: 375px) {
    .user-info-card {
        padding: 15px;
    }

    .user-name {
        font-size: 16px;
    }

    .stat-number {
        font-size: 16px;
    }
}
</style>

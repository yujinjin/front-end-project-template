<template>
    <div class="home-container">
        <!-- 主要内容区域，适配App.vue中的导航栏和底部Tab栏 -->
        <div class="content-wrapper">
            <!-- 搜索栏 -->
            <div class="search-section">
                <van-search v-model="searchText" placeholder="搜索" show-action @search="handleSearch" @cancel="handleCancel" @focus="isSearchFocused = true" @blur="isSearchFocused = false" />
            </div>

            <!-- 轮播图 -->
            <div class="banner-section">
                <van-swipe class="my-swipe" :autoplay="3000" indicator-dots :height="150">
                    <van-swipe-item>
                        <div class="banner-item" style="background-color: #ff4d4f">
                            <span class="banner-text">欢迎使用演示应用</span>
                        </div>
                    </van-swipe-item>
                    <van-swipe-item>
                        <div class="banner-item" style="background-color: #1890ff">
                            <span class="banner-text">发现更多精彩内容</span>
                        </div>
                    </van-swipe-item>
                </van-swipe>
            </div>

            <!-- 功能区 -->
            <div class="features-section">
                <van-grid :column-num="4" :border="false">
                    <van-grid-item v-for="(item, index) in features" :key="index" class="feature-item">
                        <div class="feature-icon" :style="{ backgroundColor: item.bgColor }">
                            <van-icon :name="item.icon" size="24" color="#fff" />
                        </div>
                        <span class="feature-name">{{ item.name }}</span>
                    </van-grid-item>
                </van-grid>
            </div>

            <!-- 推荐内容 -->
            <div class="recommend-section">
                <div class="section-title">推荐内容</div>
                <div class="recommend-list">
                    <van-cell v-for="(item, index) in recommendList" :key="index" :title="item.title" :label="item.subtitle" @click="handleRecommendClick(item)" class="recommend-item">
                        <template #right-icon>
                            <van-icon name="arrow-right" />
                        </template>
                    </van-cell>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { showToast, Search as VanSearch, Swipe as VanSwipe, SwipeItem as VanSwipeItem, Grid as VanGrid, GridItem as VanGridItem, Cell as VanCell, Icon as VanIcon } from "vant";
import "vant/es/search/style";
import "vant/es/swipe/style";
import "vant/es/swipe-item/style";
import "vant/es/grid/style";
import "vant/es/grid-item/style";
import "vant/es/cell/style";
import "vant/es/icon/style";
import "vant/es/toast/style";
// 搜索相关
const searchText = ref("");
const isSearchFocused = ref(false);

// 功能列表数据
const features = [
    { name: "首页", icon: "home-o", bgColor: "#1890ff" },
    { name: "消息", icon: "chat-o", bgColor: "#52c41a" },
    { name: "订单", icon: "orders-o", bgColor: "#fa8c16" },
    { name: "我的", icon: "user-o", bgColor: "#f759ab" }
];

// 推荐内容列表
const recommendList = [
    { title: "推荐功能一", subtitle: "点击查看详情" },
    { title: "推荐功能二", subtitle: "点击查看详情" },
    { title: "推荐功能三", subtitle: "点击查看详情" }
];

// 处理搜索
const handleSearch = () => {
    showToast(`搜索内容: ${searchText.value}`);
};

// 处理取消搜索
const handleCancel = () => {
    searchText.value = "";
};

// 处理推荐内容点击
const handleRecommendClick = (item: (typeof recommendList)[0]) => {
    showToast(`点击了: ${item.title}`);
};
</script>

<style scoped lang="scss">
.home-container {
    min-height: 100vh;
    background-color: #f5f5f5;
    // 不再需要为导航栏留出顶部空间，因为导航栏在App.vue中管理
}

.content-wrapper {
    padding: 10px;
}

// 搜索栏样式
.search-section {
    margin-bottom: 10px;
}

// 轮播图样式
.banner-section {
    margin-bottom: 15px;
    border-radius: 8px;
    overflow: hidden;
}

.banner-item {
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 16px;
}

.banner-text {
    text-align: center;
    font-weight: 500;
}

// 功能区样式
.features-section {
    background-color: #fff;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 15px;
}

.feature-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0;
}

.feature-icon {
    width: 48px;
    height: 48px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
}

.feature-name {
    font-size: 12px;
    color: #333;
}

// 推荐内容样式
.recommend-section {
    background-color: #fff;
    padding: 15px;
    border-radius: 8px;
}

.section-title {
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin-bottom: 10px;
}

.recommend-item {
    --van-cell-line-height: 1.4;
    --van-cell-font-size: 14px;
    --van-cell-label-font-size: 12px;
}

// 响应式调整
@media screen and (max-width: 375px) {
    .banner-item {
        height: 130px;
    }

    .feature-icon {
        width: 42px;
        height: 42px;
    }
}
</style>

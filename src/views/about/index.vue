<template>
    <div class="about-page">
        <!-- 关于我们页面内容 -->
        <div class="about-container">
            <!-- 应用Logo区域 -->
            <div class="logo-section">
                <div class="logo-box">
                    <img src="/logo.svg" alt="应用Logo" class="app-logo" />
                </div>
                <h1 class="app-name">{{ appName }}</h1>
                <p class="app-version">版本 {{ appVersion }}</p>
            </div>

            <!-- 应用介绍区域 -->
            <div class="intro-section">
                <h2 class="section-title">应用介绍</h2>
                <p class="intro-text">这是一个基于 Vue 3 + TypeScript + Vant 的现代化前端项目模板， 提供了完整的项目结构和常用功能，帮助开发者快速构建移动应用。</p>
            </div>

            <!-- 功能特性区域 -->
            <div class="features-section">
                <h2 class="section-title">功能特性</h2>
                <div class="feature-list">
                    <div class="feature-item">
                        <div class="feature-icon">
                            <span class="icon-text">✓</span>
                        </div>
                        <div class="feature-content">
                            <h3 class="feature-title">响应式设计</h3>
                            <p class="feature-desc">适配各种移动设备屏幕尺寸</p>
                        </div>
                    </div>
                    <div class="feature-item">
                        <div class="feature-icon">
                            <span class="icon-text">✓</span>
                        </div>
                        <div class="feature-content">
                            <h3 class="feature-title">TypeScript 支持</h3>
                            <p class="feature-desc">类型安全的代码开发体验</p>
                        </div>
                    </div>
                    <div class="feature-item">
                        <div class="feature-icon">
                            <span class="icon-text">✓</span>
                        </div>
                        <div class="feature-content">
                            <h3 class="feature-title">组件化架构</h3>
                            <p class="feature-desc">模块化、可复用的组件设计</p>
                        </div>
                    </div>
                    <div class="feature-item">
                        <div class="feature-icon">
                            <span class="icon-text">✓</span>
                        </div>
                        <div class="feature-content">
                            <h3 class="feature-title">状态管理</h3>
                            <p class="feature-desc">使用 Pinia 进行高效的状态管理</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 开发者信息区域 -->
            <div class="developer-section">
                <h2 class="section-title">开发者信息</h2>
                <div class="developer-info">
                    <p class="developer-name">前端开发团队</p>
                    <p class="developer-email">联系邮箱：yujinjin9@126.com</p>
                </div>
            </div>

            <!-- 版权信息区域 -->
            <div class="copyright-section">
                <p class="copyright-text">© {{ currentYear }} 版权所有</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// 应用信息
const appName = ref("前端项目模板");
const appVersion = ref("1.0.0");
const currentYear = new Date().getFullYear();
</script>

<style lang="scss" scoped>
// 颜色变量
$primary-color: #00b85c;
$text-primary: #333333;
$text-secondary: #666666;
$text-tertiary: #999999;
$bg-primary: #ffffff;
$bg-secondary: #f8f8f8;
$border-color: #eeeeee;

// 尺寸变量
$section-spacing: 24px;
$border-radius: 12px;

.about-page {
    background-color: $bg-secondary;
    padding: 0px 12px;
}

.about-container {
    max-width: 600px;
    margin: 0 auto;
}

// Logo 区域样式
.logo-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px 0;
    text-align: center;
    background-color: $bg-primary;
    border-radius: $border-radius;
    margin-bottom: $section-spacing;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.logo-box {
    width: 80px;
    height: 80px;
    border-radius: 16px;
    background-color: $bg-secondary;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    overflow: hidden;
}

.app-logo {
    width: 60%;
    height: 60%;
    object-fit: contain;
}

.app-name {
    font-size: 20px;
    font-weight: 600;
    color: $text-primary;
    margin: 0 0 8px 0;
}

.app-version {
    font-size: 14px;
    color: $text-tertiary;
    margin: 0;
}

// 通用区域样式
.intro-section,
.features-section,
.developer-section {
    background-color: $bg-primary;
    border-radius: $border-radius;
    padding: 20px 16px;
    margin-bottom: $section-spacing;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.section-title {
    font-size: 18px;
    font-weight: 600;
    color: $text-primary;
    margin: 0 0 16px 0;
    padding-bottom: 12px;
    border-bottom: 1px solid $border-color;
}

// 介绍区域样式
.intro-text {
    font-size: 14px;
    line-height: 1.6;
    color: $text-secondary;
    margin: 0;
}

// 功能列表样式
.feature-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.feature-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
}

.feature-icon {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background-color: rgba($primary-color, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 2px;
}

.icon-text {
    font-size: 16px;
    font-weight: 600;
    color: $primary-color;
}

.feature-content {
    flex: 1;
}

.feature-title {
    font-size: 15px;
    font-weight: 600;
    color: $text-primary;
    margin: 0 0 4px 0;
}

.feature-desc {
    font-size: 13px;
    color: $text-tertiary;
    margin: 0;
}

// 开发者信息样式
.developer-info {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.developer-name,
.developer-email {
    font-size: 14px;
    color: $text-secondary;
    margin: 0;
}

// 版权信息样式
.copyright-section {
    text-align: center;
    padding: 16px 0;
}

.copyright-text {
    font-size: 12px;
    color: $text-tertiary;
    margin: 0;
}

// 响应式调整
@media screen and (max-width: 375px) {
    .about-page {
        padding: calc(constant(safe-area-inset-top) + 44px) 12px calc(constant(safe-area-inset-bottom) + 24px);
        padding: calc(env(safe-area-inset-top) + 44px) 12px calc(env(safe-area-inset-bottom) + 24px);
    }

    .logo-box {
        width: 70px;
        height: 70px;
    }

    .app-name {
        font-size: 18px;
    }

    .section-title {
        font-size: 16px;
    }
}
</style>

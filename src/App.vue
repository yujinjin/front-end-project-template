<template>
    <config-provider :theme-vars="themeVars">
        <nav-bar />
        <router-view class="page-container" :class="{ 'has-navbar': navbarStore.navBarInfo.isShow, 'has-footbar': footbarStore.isShow }" v-slot="{ Component, route }">
            <transition :name="dataStore.routeDirection === 'forward' ? 'van-slide-right' : 'van-slide-left'" :duration="{ enter: 400, leave: 0 }">
                <keep-alive :max="10" :include="dataStore.keepAliveRouteNames">
                    <component :is="Component" :key="route.fullPath" />
                </keep-alive>
            </transition>
        </router-view>
        <foot-bar />
    </config-provider>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { ConfigProvider } from "vant";
import { useDataStore, useNavbarStore, useFootbarStore } from "@/stores";
import NavBar from "@/components/nav-bar.vue";
import FootBar from "@/components/foot-bar.vue";

// 引入数据存储模块
const dataStore = useDataStore();
// 引入导航栏存储模块
const navbarStore = useNavbarStore();
// 引入底部栏存储模块
const footbarStore = useFootbarStore();

// themeVars 内的值会被转换成对应 CSS 变量
const themeVars = ref({
    checkboxBorderColor: "#00B85C",
    checkboxSize: "0.4rem",
    popupRoundBorderRadius: "0.16rem"
});
</script>

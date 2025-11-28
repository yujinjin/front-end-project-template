<template>
    <van-tabbar v-if="footbarStore.isShow" fixed safe-area-inset-bottom route :z-index="999">
        <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item replace to="/shopping-cart" icon="cart-o" :badge="footbarStore.shoppingCartCount > 99 ? '99+' : footbarStore.shoppingCartCount">购物车</van-tabbar-item>
        <van-tabbar-item replace to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
</template>
<script setup lang="ts">
import { useFootbarStore } from "@/stores";
import { Tabbar as VanTabbar, TabbarItem as VanTabbarItem } from "vant";
import "vant/es/tabbar/style";
import "vant/es/tabbar-item/style";

const footbarStore = useFootbarStore();
</script>

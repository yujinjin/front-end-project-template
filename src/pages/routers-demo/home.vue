<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2022-10-24 11:18:01
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2022-10-24 15:13:47
 * @项目的路径: \360-manager-H5\src\pages\routers-demo\home.vue
 * @描述: 首页演示
-->
<template>
    <img alt="Vue logo" src="@imgs/logo.png" />
    <div id="nav"><router-link to="/">Home</router-link> | <router-link to="/about">About</router-link></div>

    <hello-world msg="Hello Vue 3 + Vite" />
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";

onMounted(() => {
    console.info("App onMounted");
});

onUnmounted(() => {
    console.info("App onUnmounted");
});
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>

<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2022-10-24 11:21:46
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2022-10-24 15:14:02
 * @项目的路径: \360-manager-H5\src\pages\routers-demo\about.vue
 * @描述: about 页面演示
-->
<template>
    <div class="about">
        <img alt="Vue logo" src="@imgs/logo.png" />
        <div id="nav"><router-link to="/">Home</router-link> | <router-link to="/about">About</router-link></div>
        <h1>This is an about page</h1>
    </div>
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

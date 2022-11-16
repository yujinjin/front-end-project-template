<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2022-10-24 10:12:51
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2022-10-24 14:03:55
 * @项目的路径: \360-manager-H5\src\js\components\hello-word.vue
 * @描述: 头部注释配置模板
-->

<template>
    <h1>{{ msg }}</h1>

    <p>
        Recommended IDE setup:
        <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
        +
        <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    </p>

    <p>See <code>README.md</code> for more information.</p>

    <p>
        <a href="https://vitejs.dev/guide/features.html" target="_blank"> Vite Docs </a>
        |
        <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
    </p>

    <button type="button" @click="count++">count is: {{ count }}</button>
    <p>
        Edit
        <code>components/HelloWorld.vue</code> to test hot module replacement.
    </p>
</template>
<script setup>
import { ref, defineProps } from "vue";

defineProps({ msg: String });

const count = ref(0);
</script>

<style scoped>
a {
    color: #42b983;
}

label {
    margin: 0 0.5em;
    font-weight: bold;
}

code {
    background-color: #eee;
    padding: 2px 4px;
    border-radius: 4px;
    color: #304455;
}
</style>

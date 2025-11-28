<template>
    <div v-if="navbarStore.navBarInfo.isShow" class="nav-bar">
        <template v-if="navbarStore.navBarInfo.left.contents && navbarStore.navBarInfo.left.isShow">
            <div class="left-contents" v-if="typeof navbarStore.navBarInfo.left.contents === 'string'" v-html="navbarStore.navBarInfo.left.contents" @click.stop.prevent="leftClick" />
            <div class="left-contents" v-else @click.stop.prevent="leftClick">
                <component :is="navbarStore.navBarInfo.left.contents" />
            </div>
        </template>
        <template v-if="navbarStore.navBarInfo.center.contents && navbarStore.navBarInfo.center.isShow">
            <div class="center-contents" v-if="typeof navbarStore.navBarInfo.center.contents === 'string'" v-html="navbarStore.navBarInfo.center.contents" @click.stop.prevent="centerClick" />
            <div class="center-contents" v-else @click.stop.prevent="centerClick">
                <component :is="navbarStore.navBarInfo.center.contents" />
            </div>
        </template>
        <template v-if="navbarStore.navBarInfo.right.contents && navbarStore.navBarInfo.right.isShow">
            <div class="right-contents" v-if="typeof navbarStore.navBarInfo.right.contents === 'string'" v-html="navbarStore.navBarInfo.right.contents" @click.stop.prevent="rightClick" />
            <div class="right-contents" v-else @click.stop.prevent="rightClick">
                <component :is="navbarStore.navBarInfo.right.contents" />
            </div>
        </template>
    </div>
</template>
<script setup lang="ts">
import { useNavbarStore } from "@/stores";
import { useRouter } from "vue-router";

const navbarStore = useNavbarStore();
const router = useRouter();

const leftClick = async function () {
    if (navbarStore.navBarInfo.left.callBack) {
        const isBack = await navbarStore.navBarInfo.left.callBack();
        if (isBack === false) {
            return;
        }
    }
    router.back();
};

const centerClick = async function () {
    if (navbarStore.navBarInfo.center.callBack) {
        await navbarStore.navBarInfo.center.callBack();
    }
};

const rightClick = async function () {
    if (navbarStore.navBarInfo.right.callBack) {
        await navbarStore.navBarInfo.right.callBack();
    } else if (navbarStore.navBarInfo.right.action === "share") {
        // todo: 执行分享操作
    }
};
</script>
<style lang="scss" scoped>
.nav-bar {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    width: 100vw;
    background-color: #ffffff;
    z-index: 999;
    border-bottom: 1px solid #e6e4e4;
    background-color: #f7f7f7;
    /* 顶部安全距离：兼容旧版本（constant）和新版本（env） */
    padding-top: constant(safe-area-inset-top);
    padding-top: env(safe-area-inset-top);
    &::after {
        content: "";
        position: absolute;
        left: 0px;
        right: 0px;
        bottom: 0px;
        height: 1px;
        background-color: #f4f5f9;
        transform: scaleY(0.5);
    }

    .left-contents,
    .center-contents,
    .right-contents {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        height: 44px;
        line-height: 44px;
        bottom: 0px;
    }

    :deep(.left-contents) {
        left: 0px;
        bottom: 0px;
        position: absolute;
        padding: 0px 10px;

        i {
            font-size: 16px;
            margin-right: 2px;
        }
    }

    .center-contents {
        margin: 0px 15%;
        color: rgb(18, 23, 54);
        font-size: 16px;
        font-weight: 600;
        white-space: nowrap;
        word-wrap: normal;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .right-contents {
        position: absolute;
        right: 0px;
        bottom: 0px;
        padding: 0px 16px;
    }
}
</style>

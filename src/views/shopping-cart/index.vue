<template>
    <div class="shopping-cart-container">
        <div class="content-wrapper">
            <!-- 购物车为空状态 -->
            <div v-if="cartItems.length === 0" class="empty-cart">
                <van-image src="https://img.yzcdn.cn/vant/cart-empty.png" width="160" height="160" />
                <p class="empty-text">购物车还是空的</p>
                <van-button type="primary" class="go-shopping-btn">去逛逛</van-button>
            </div>

            <!-- 购物车商品列表 -->
            <div v-else class="cart-items">
                <div v-for="(item, index) in cartItems" :key="item.id" class="cart-item">
                    <van-checkbox v-model="item.selected" class="item-checkbox" />

                    <div class="item-content">
                        <div class="item-image">
                            <van-image :src="item.image" fit="cover" width="80" height="80" />
                        </div>

                        <div class="item-details">
                            <h3 class="item-title">{{ item.title }}</h3>
                            <p class="item-spec">{{ item.spec }}</p>
                            <div class="item-bottom">
                                <span class="item-price">¥{{ item.price.toFixed(2) }}</span>
                                <van-stepper v-model="item.quantity" :min="1" :max="99" @change="updateQuantity(index)" class="item-stepper" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 底部结算栏 -->
        <div v-if="cartItems.length > 0" class="checkout-bar">
            <div class="checkout-left">
                <van-checkbox v-model="selectAll" @click="toggleSelectAll" class="select-all-checkbox">全选</van-checkbox>
                <div class="total-price">
                    合计：
                    <span class="price">¥{{ totalPrice.toFixed(2) }}</span>
                </div>
            </div>
            <van-button type="primary" class="checkout-button" :disabled="!hasSelectedItems">结算({{ selectedCount }})</van-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { showToast, Image as VanImage, Stepper as VanStepper, Checkbox as VanCheckbox, Button as VanButton } from "vant";
import { useDataStore } from "@/stores/index";
import "vant/es/image/style";
import "vant/es/stepper/style";
import "vant/es/checkbox/style";
import "vant/es/button/style";

// 定义组件名称，用于缓存路由
defineOptions({
    name: "shopping-cart"
});

const dataStore = useDataStore();
// 添加购物车路由到缓存列表
dataStore.addKeepAliveRouteName("shopping-cart");

// 购物车商品类型定义
interface CartItem {
    id: string;
    title: string;
    spec: string;
    price: number;
    quantity: number;
    image: string;
    selected: boolean;
}

// 模拟购物车数据
const cartItems = ref<CartItem[]>([
    {
        id: "1",
        title: "Vant 官方周边 T 恤",
        spec: "颜色：白色，尺码：L",
        price: 99.0,
        quantity: 1,
        image: "https://img.yzcdn.cn/vant/t-thirt.png",
        selected: true
    },
    {
        id: "2",
        title: "Vant 官方周边帆布包",
        spec: "颜色：黑色",
        price: 59.0,
        quantity: 1,
        image: "https://img.yzcdn.cn/vant/bag.png",
        selected: true
    },
    {
        id: "3",
        title: "Vant 官方周边马克杯",
        spec: "颜色：蓝色",
        price: 39.0,
        quantity: 2,
        image: "https://img.yzcdn.cn/vant/cup.png",
        selected: false
    }
]);

// 计算是否全选
const selectAll = computed({
    get: () => {
        return cartItems.value.length > 0 && cartItems.value.every(item => item.selected);
    },
    set: value => {
        cartItems.value.forEach(item => {
            item.selected = value;
        });
    }
});

// 计算选中商品数量
const selectedCount = computed(() => {
    return cartItems.value.filter(item => item.selected).length;
});

// 计算总价
const totalPrice = computed(() => {
    return cartItems.value.reduce((total, item) => {
        return item.selected ? total + item.price * item.quantity : total;
    }, 0);
});

// 是否有选中商品
const hasSelectedItems = computed(() => {
    return cartItems.value.some(item => item.selected);
});

// 切换全选状态
const toggleSelectAll = () => {
    cartItems.value.forEach(item => {
        item.selected = !selectAll.value;
    });
};

// 切换单个商品选中状态
const toggleSelectItem = (index: number) => {
    cartItems.value[index]!.selected = !cartItems.value[index]!.selected;
};

// 更新商品数量
const updateQuantity = (index: number) => {
    // 这里可以添加更新购物车数量的API调用
    console.log(`更新商品 ${cartItems.value[index]!.id} 数量为 ${cartItems.value[index]!.quantity}`);
};

// 去购物
const goShopping = () => {
    // 跳转到首页或商品列表页
    console.log("去购物");
};

// 结算
const checkout = () => {
    if (!hasSelectedItems.value) {
        showToast("请选择商品");
        return;
    }
    // 这里可以添加结算逻辑
    console.log(
        "结算",
        cartItems.value.filter(item => item.selected)
    );
    showToast("结算成功");
};

// 生命周期钩子
onMounted(() => {
    // 这里可以添加获取购物车数据的API调用
    console.log("购物车页面加载");
});
</script>

<style scoped lang="scss">
.shopping-cart-container {
    min-height: 100vh;
    background-color: #f5f5f5;
}

.content-wrapper {
    padding-bottom: 60px; // 为底部结算栏留出空间
}

// 空购物车样式
.empty-cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 0;
    text-align: center;

    .empty-text {
        margin: 20px 0;
        color: #999;
        font-size: 14px;
    }

    .go-shopping-btn {
        width: 120px;
        border-radius: 20px;
    }
}

// 购物车商品列表样式
.cart-items {
    background-color: #fff;
    margin-top: 10px;
}

.cart-item {
    display: flex;
    align-items: center;
    padding: 15px;
    border-bottom: 1px solid #f0f0f0;

    .item-checkbox {
        margin-right: 10px;
        --van-checkbox-size: 20px;
    }

    .item-content {
        flex: 1;
        display: flex;
    }

    .item-image {
        margin-right: 10px;
    }

    .item-details {
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    .item-title {
        font-size: 14px;
        color: #333;
        margin-bottom: 5px;
        line-height: 1.4;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .item-spec {
        font-size: 12px;
        color: #999;
        margin-bottom: 8px;
    }

    .item-bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: auto;
    }

    .item-price {
        font-size: 16px;
        color: #ee0a24;
        font-weight: 600;
    }

    .item-stepper {
        --van-stepper-input-width: 32px;
        --van-stepper-height: 28px;
    }
}

// 底部结算栏样式
.checkout-bar {
    position: fixed;
    bottom: 50px;
    left: 0px;
    right: 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 15px;
    background-color: #fff;
    border-top: 1px solid #f0f0f0;
    z-index: 100;

    .checkout-left {
        display: flex;
        align-items: center;
    }

    .select-all-checkbox {
        margin-right: 10px;
        --van-checkbox-size: 20px;
    }

    .total-price {
        font-size: 14px;
        color: #666;

        .price {
            font-size: 18px;
            color: #ee0a24;
            font-weight: 600;
        }
    }

    .checkout-button {
        min-width: 100px;
        border-radius: 20px;
    }
}

// 响应式调整
@media screen and (max-width: 375px) {
    .cart-item {
        padding: 12px;
    }

    .item-title {
        font-size: 13px;
    }

    .item-price {
        font-size: 15px;
    }

    .total-price {
        font-size: 13px;

        .price {
            font-size: 16px;
        }
    }
}
</style>

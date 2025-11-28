<template>
    <div class="login-container">
        <!-- 登录头部 -->
        <div class="login-header">
            <h1 class="login-title">欢迎登录</h1>
            <p class="login-subtitle">请输入您的信息完成登录</p>
        </div>

        <!-- 登录表单 -->
        <div class="login-form">
            <div class="input-group">
                <div class="input-label">用户名</div>
                <div class="input-wrapper">
                    <input
                        type="text"
                        class="input-field"
                        maxlength="10"
                        placeholder="请填写姓名"
                        v-model.trim="inputForm.name"
                        :class="{ 'input-focused': focusedField === 'name' }"
                        @focus="focusedField = 'name'"
                        @blur="focusedField = ''"
                    />
                </div>
            </div>

            <div class="input-group">
                <div class="input-label">手机号</div>
                <div class="input-wrapper">
                    <input
                        type="text"
                        class="input-field"
                        maxlength="11"
                        placeholder="请填写手机号"
                        @keyup="checkNumber('phone')"
                        v-model.trim="inputForm.phone"
                        :class="{ 'input-focused': focusedField === 'phone' }"
                        @focus="focusedField = 'phone'"
                        @blur="focusedField = ''"
                    />
                </div>
            </div>

            <div class="input-group">
                <div class="input-label">验证码</div>
                <div class="input-wrapper code-input-wrapper">
                    <input
                        type="text"
                        class="input-field code-input"
                        maxlength="6"
                        placeholder="请填写验证码"
                        @keyup="checkNumber('code')"
                        v-model.trim="inputForm.code"
                        :class="{ 'input-focused': focusedField === 'code' }"
                        @focus="focusedField = 'code'"
                        @blur="focusedField = ''"
                    />
                    <button class="get-code-btn" :class="{ 'btn-active': canSendCode, 'btn-disabled': !canSendCode }" :disabled="!canSendCode || isLoadingForGetCode" @click="getCode">
                        <loading v-if="isLoadingForGetCode" size="small" />
                        {{ countDownSecond > 0 ? `${countDownSecond}秒后重新获取` : "获取验证码" }}
                    </button>
                </div>
            </div>
        </div>

        <!-- 用户协议 -->
        <div class="login-agreement">
            <div class="no-code-tips" :class="{ active: !canSendCode }">收不到短信验证码？</div>
            <div class="agreement-wrapper" @click="isAgree = !isAgree">
                <checkbox v-model="isAgree" @click.stop.prevent checked-color="#00B85C" class="agreement-checkbox" />
                <div class="agreement-text">
                    我已阅读并同意
                    <a @click.stop.prevent href="#" class="agreement-link">《用户协议》</a>
                    和
                    <a @click.stop.prevent href="#" class="agreement-link">《隐私政策》</a>
                </div>
            </div>
        </div>

        <!-- 登录按钮 -->
        <div class="button-panel">
            <button class="login-btn" :class="{ 'btn-active': canSubmitLogin, 'btn-disabled': !canSubmitLogin }" :disabled="!canSubmitLogin || isLoadingForSubmit" @click="submitLogin">
                <loading v-if="isLoadingForSubmit" size="small" color="#fff" />
                <span v-else>登录</span>
            </button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { Loading, Checkbox, showToast } from "vant";
import "vant/es/loading/style";
import "vant/es/checkbox/style";
import { useRouter } from "vue-router";
import loginAPI from "@/api/system";
import { chinaPhoneNumberValidate } from "@/utils/index";
import { useStorageStore } from "@/stores";

const storageStore = useStorageStore();
const router = useRouter();

// 表单相关状态
const isAgree = ref(false);
const countDownSecond = ref(-1);
const isLoadingForGetCode = ref(false);
const isLoadingForSubmit = ref(false);
const focusedField = ref("");

// 登录表单数据
const inputForm = reactive({
    name: "",
    phone: "",
    code: ""
});

// 计算属性
const canSendCode = computed(() => {
    return chinaPhoneNumberValidate(inputForm.phone) && isAgree.value && countDownSecond.value <= 0;
});

const canSubmitLogin = computed(() => {
    return inputForm.name.length > 0 && chinaPhoneNumberValidate(inputForm.phone) && inputForm.code.length === 6 && countDownSecond.value >= 0;
});

// 验证数字输入
const checkNumber = function (name: keyof typeof inputForm) {
    if (!inputForm[name]) return;
    const reg = /[^\d]/g;
    if (reg.test(inputForm[name])) {
        inputForm[name] = inputForm[name].replace(reg, "");
    }
};

// 获取验证码
const getCode = async () => {
    if (!canSendCode.value || isLoadingForGetCode.value) {
        return;
    }

    try {
        isLoadingForGetCode.value = true;
        await loginAPI.sendValidateCode({ phone: inputForm.phone });
        showToast("验证码已发送");

        // 倒计时逻辑
        countDownSecond.value = 60;
        const timer = setInterval(() => {
            countDownSecond.value--;
            if (countDownSecond.value <= 0) {
                clearInterval(timer);
            }
        }, 1000);
    } catch (error) {
        showToast("发送失败，请稍后重试");
        console.error("获取验证码失败:", error);
    } finally {
        isLoadingForGetCode.value = false;
    }
};

// 提交登录
const submitLogin = async () => {
    if (!canSubmitLogin.value || isLoadingForSubmit.value) {
        return;
    }

    try {
        isLoadingForSubmit.value = true;
        const { token, expiredIn, userName } = (await loginAPI.login(inputForm)) as { token: string; expiredIn: number; userName: string };

        // 登录成功后，将登录信息存储到本地存储
        storageStore.login({ token, expiredIn, userName });

        // 跳转到之前访问的页面或首页
        const redirect = router.currentRoute.value.query.redirect as string;
        if (redirect) {
            router.replace(decodeURIComponent(redirect));
        } else {
            router.replace({ name: "home" });
        }
    } catch (error) {
        showToast("登录失败，请检查验证码是否正确");
        console.error("登录失败:", error);
    } finally {
        isLoadingForSubmit.value = false;
    }
};
</script>
<style lang="scss" scoped>
// 颜色变量
// 主主题色
$primary-color: #00b85c;
// 主题色相关变体
$primary-hover: #26c6da;
$primary-disabled: #a5d6a7;
// 文本颜色
$text-primary: #333333;
$text-secondary: #666666;
$text-tertiary: #999999;
// 边框颜色
$border-color: #e8e8e8;
$border-focus: $primary-color;
// 背景颜色
$background-color: #f5f5f5;
$white: #ffffff;

// 动画变量
$transition-fast: 0.2s ease;
$transition-normal: 0.3s ease;

.login-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
    padding: 0 20px;
    background-color: $background-color;
    box-sizing: border-box;
    position: relative;

    // 添加顶部安全区域
    padding-top: env(safe-area-inset-top, 20px);
}

// 登录头部
.login-header {
    text-align: center;
    margin: 40px 0 30px;

    .login-title {
        font-size: 24px;
        font-weight: 600;
        color: $text-primary;
        margin-bottom: 8px;
        letter-spacing: 0.5px;
    }

    .login-subtitle {
        font-size: 14px;
        color: $text-tertiary;
        line-height: 1.5;
    }
}

// 登录表单
.login-form {
    background-color: $white;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: box-shadow $transition-normal;

    &:active {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
}

// 输入组
.input-group {
    margin-bottom: 20px;

    .input-label {
        font-size: 14px;
        color: $text-secondary;
        margin-bottom: 8px;
        display: block;
    }

    .input-wrapper {
        position: relative;
    }

    .input-field {
        width: 100%;
        height: 48px;
        border: 1px solid $border-color;
        border-radius: 8px;
        padding: 0 16px;
        letter-spacing: 2px;
        font-size: 18px;
        color: $text-primary;
        background-color: $white;
        transition: all $transition-fast;
        box-sizing: border-box;

        // 清除默认样式
        &:focus {
            outline: none;
            border-color: $border-focus;
            box-shadow: 0 0 0 2px rgba(0, 184, 92, 0.1);
        }

        &::placeholder {
            color: $text-tertiary;
            font-size: 14px;
        }

        &.input-focused {
            border-color: $border-focus;
        }
    }

    // 验证码输入特殊样式
    .code-input-wrapper {
        display: flex;
        gap: 12px;
        align-items: center;
    }

    .code-input {
        flex: 1;
    }
}

// 获取验证码按钮
.get-code-btn {
    height: 40px;
    padding: 0 16px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 500;
    transition: all $transition-fast;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 120px;
    border: none;

    &.btn-active {
        background-color: $primary-color;
        color: $white;

        &:hover {
            background-color: $primary-hover;
        }

        &:active {
            transform: scale(0.98);
        }
    }

    &.btn-disabled {
        background-color: #f5f5f5;
        color: $text-tertiary;
        cursor: not-allowed;
    }
}

// 协议部分
.login-agreement {
    margin: 16px 0 24px;

    .no-code-tips {
        width: 100%;
        text-align: right;
        color: $primary-color;
        height: 24px;
        font-size: 12px;
        opacity: 0.6;
        transition: opacity $transition-fast;
        cursor: pointer;
        margin-bottom: 8px;

        &.active {
            opacity: 1;
        }

        &:hover {
            opacity: 1;
        }
    }

    .agreement-wrapper {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .agreement-checkbox {
        --van-checkbox-size: 16px;
        flex-shrink: 0;
    }

    .agreement-text {
        flex: 1;
        font-size: 13px;
        color: $text-tertiary;
        line-height: 1.4;

        .agreement-link {
            color: $primary-color;
            text-decoration: none;

            &:hover {
                text-decoration: underline;
            }
        }
    }
}

// 登录按钮
.button-panel {
    margin-bottom: 40px;

    .login-btn {
        width: 100%;
        height: 50px;
        border-radius: 25px;
        font-size: 16px;
        font-weight: 600;
        transition: all $transition-fast;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;

        &.btn-active {
            background-color: $primary-color;
            color: $white;

            &:hover {
                background-color: $primary-hover;
            }

            &:active {
                transform: scale(0.98);
            }
        }

        &.btn-disabled {
            background-color: $primary-disabled;
            color: $white;
            cursor: not-allowed;
        }
    }
}

// 响应式调整
@media screen and (max-width: 375px) {
    .login-container {
        padding: 0 16px;
    }

    .login-header {
        margin: 30px 0 24px;

        .login-title {
            font-size: 22px;
        }
    }

    .login-form {
        padding: 20px;
    }

    .input-group {
        margin-bottom: 16px;
    }

    .input-field {
        height: 44px;
        font-size: 14px;
    }

    .get-code-btn {
        height: 36px;
        min-width: 100px;
        font-size: 12px;
        padding: 0 12px;
    }

    .login-btn {
        height: 46px;
        font-size: 15px;
    }
}

// 适配大屏显示
@media screen and (min-width: 768px) {
    .login-container {
        max-width: 400px;
        margin: 0 auto;
        padding: 0;
    }
}
</style>

## web移动端项目

项目名称：web-app-ts

## 项目介绍

这是一个基于typescript的移动端项目，使用vite + vue3 + ts + scss + vant4 + vue-router + pinia 等技术栈。

### 项目目录结构

```
├── src
│   ├── assets
│   ├── components
│   ├── layout
│   ├── pages
│   ├── router
│   ├── store
│   ├── styles
│   ├── utils
│   ├── App.vue
│   ├── main.ts
├── public
│   ├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
```

### 项目配置如下

- vant 组件自动按需引入（放弃，ts项目还是走常规用法，页面手动引入）
- 基于 Rem 的适配方案
- 生产环境 gzip 压缩资源(放弃，直接走CDN 配置（阿里云 / 腾讯云等）)
- 基于 CDN 加速的资源加载(放弃，直接走CDN 配置（阿里云 / 腾讯云等）)
- 配置 VConsole 调试工具
- Mock 数据支持

### 待验证问题如下：

2. 验证路由缓存的正确性
3. 修复当前页面之间转场效果对购物车中的底部固定结算内容的影响

## 前端项目模板

项目名称：front-end-project-template


### qifu 公司后台管理系统分支说明

#### 1. qifu-cms-main
- 说明：qifu 公司内容管理系统的主分支，主要用于修改内部组件等业务功能的

#### 2.qifu-cms-vuecli
-   说明：qifu公司定制化、无菜单、多页
-   项目框架：vue-cli5 + vue3 + pinia + element-plus2 + mockjs
-   风格：绿色、紧凑型

#### 3.qifu-cms-vuecli-template
-   说明：qifu-cms-vuecli项目脚手架的模板

#### 4. qifu-cms-vite
-   说明：qifu公司定制化、无菜单、多页
-   项目框架：vite + vue3 + pinia + element-plus2 + mockjs
-   风格：绿色、紧凑型

#### 5. qifu-cms-vite-template
-   说明：qifu-cms-vite项目脚手架的模板


### 通用后台管理系统分支说明

#### 1.cms-main
- 说明：普通的业务内容管理系统主分支，没有菜单导航，主要用于修改内部组件等业务功能的
- 项目框架：vite + vue3 + vue-router + pinia + element-plus2 + mockjs
- 风格：绿色、紧凑型

#### 2. cms-template
- 说明：cms 项目脚手架的模板

#### 3. mid-platform
-   说明：中台单页系统主分支，有导航菜单，支持多个子系统集成（IFRAME 嵌套引入）
-   项目框架：vite + vue3 + vue-router + pinia + element-plus2 + mockjs
-   风格：绿色、紧凑型

#### 4. mid-platform-template
- 说明：mid-platform 项目脚手架的模板

#### 5. cms-ts-main
- 说明：普通的业务内容管理系统，没有菜单导航
- 项目框架：vite + vue3 + vue-router + pinia + element-plus2 + mockjs + typescript
- 风格：绿色、紧凑型

#### 6. cms-ts-template
- 说明：cms-ts 项目脚手架的模板

#### 7. mid-platform-ts
- 说明：中台单页系统，有导航菜单，支持多个子系统集成（IFRAME 嵌套引入）
- 项目框架：vite + vue3 + vue-router + pinia + element-plus2 + mockjs + typescript
- 风格：绿色、紧凑型

#### 8. mid-platform-ts-template
-   说明：mid-platform-ts项目脚手架的模板


### 移动端分支说明

#### 1.web-app
-   说明：移动端H5项目
-   适用环境：微信 H5、H5、hybrid App
-   项目框架：vite + vue3 + vue-router + pinia + vant

#### 2.web-app-template
-   说明：web-app项目脚手架的模板
-   可选：vant、微信 H5/H5/hybrid App

#### 3.web-app-ts
-   说明：移动端H5项目
-   适用环境：微信 H5、H5、hybrid App
-   项目框架：vite + vue3 + vue-router + pinia + vant + typescript

#### 4.web-app-ts-template
-   说明：web-app-ts项目脚手架的模板
-   可选：vant、微信 H5/H5/hybrid App

#### 5.weixin-app
-   说明：移动端微信小程序项目
-   适用环境：微信小程序

#### 6.weixin-app-template
-   说明：weixin-app项目脚手架的模板
-   可选：vant

### 分支树说明
```
└── main
    ├── qifu-cms-main
    │   ├── qifu-cms-vuecli
    │   │   └── qifu-cms-vuecli-template
    │   └── qifu-cms-vite
    │       └── qifu-cms-vite-template
    ├── cms-main
    │   ├── cms-template
    │   └── mid-platform
    │       └── mid-platform-template
    ├── cms-ts-main
    │   ├── cms-ts-template
    │   └── mid-platform-ts
    │       └── mid-platform-ts-template
    ├── web-app
    │   └── web-app-template
    ├── web-app-ts
    │   └── web-app-ts-template
    └── weixin-app
        └── weixin-app-template

```

### 模板配置说明(template-config.json)
```json
{
    // 模板名称
    "name": "front-end-project-template",
    // 模板描述
    "description": "前端项目模板",
    // 模板提示词列表
    "prompts": [
        {
            "type": "input", // 类型，其他类型看官方文档
            "name": "projectName", // 请输入项目描述
            "message": "请输入项目名称",
            "default": "" // 默认值，用户不输入时用此值
        }
    ],
    // 需要编译处理的文件列表
    "compileFiles": ["/package.json", "/.env"],
    // 脚本列表
    "scripts": ["mdev", "dev", "build"]
}
```


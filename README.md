# mid-platform

- 说明：中台单页系统主分支，有导航菜单，支持多个子系统集成（IFRAME 嵌套引入），主要用于修改内部菜单等业务功能的
- 项目框架：vite + vue3 + vue-router + pinia + element-plus + mockjs + typescript
- 风格：绿色、紧凑型

## 使用vite构建工具需要注意的几个点：

1. 引入vue文件时，需要在文件路径后添加.vue后缀。

2. 默认情况下vite不支持类似webpack中的provide配置，如果真的需要只能通过define来配置。

3. 项目中使用了sass，需要在vite.config.js中配置sass插件。

4. 默认情况下vite.config.js是有意推迟加载任何.env\* 文件，所以要获取env文件内的环境变量需要loadEnv辅助函数手动加载它们。

5. env文件中的变量不会自动注入到process.env中，所以项目中应用程序代码中的process.env不会被替代。

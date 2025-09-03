export default {
    name: "qifu-cms-vuecli-template",
    description: "qifu公司定制化、无菜单、多页，基于vue-cli5 + vue3 + pinia + element-plus + vue-router + sass",
    questions: [
        {
            type: "input",
            name: "projectDescription",
            message: "请输入项目描述",
            default: ""
        },
        {
            type: "input",
            name: "projectAuthor",
            message: "请输入项目作者",
            default: ""
        },
        {
            type: "number",
            name: "serverPort",
            message: "服务端口号",
            default: 8080
        },
        {
            type: "input",
            name: "serverOpen",
            message: "开发服务器启动时，是否自动在浏览器中打开应用程序",
            default: "false"
        },
        {
            type: "input",
            name: "buildStaticDir",
            message: "项目静态资源打包相对路径(不要带上项目名会自动拼接)",
            default: "",
            validate: function (input) {
                if (input && !/^(?:[a-zA-Z]:[\\/]|\\\\)?(?:\.\.|\.)?(?:[\\/][^\\/:*?"<>|\r\n]+)*(?:\.[^\\/:*?"<>|\r\n]+)?$/.test(input)) {
                    return "非法路径";
                }
            }
        },
        {
            type: "input",
            name: "buildBasePath",
            message: "项目静态资源访问路径(不要带上项目名会自动拼接)",
            default: "",
            validate: function (input) {
                if (input && !/^(?:[a-zA-Z]:[\\/]|\\\\)?(?:\.\.|\.)?(?:[\\/][^\\/:*?"<>|\r\n]+)*(?:\.[^\\/:*?"<>|\r\n]+)?$/.test(input)) {
                    return "非法路径";
                }
            }
        },
        {
            type: "input",
            name: "buildHtmlDir",
            message: "项目HTML文件打包目录(不要带上项目名会自动拼接，当前路径是针对于静态资源打包相对路径)",
            default: "",
            validate: function (input) {
                if (input && !/^(?:[a-zA-Z]:[\\/]|\\\\)?(?:\.\.|\.)?(?:[\\/][^\\/:*?"<>|\r\n]+)*(?:\.[^\\/:*?"<>|\r\n]+)?$/.test(input)) {
                    return "非法路径";
                }
            }
        }
    ],
    // 编译文件列表
    compileFiles: ["/package.json", "/.env"],
    // npm 脚本
    scripts: ["mserve", "serve", "build"]
};

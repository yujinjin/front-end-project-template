/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2022-10-20 16:03:42
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2022-11-10 21:29:44
 * @项目的路径: \360-manager-H5\src\js\api\request.js
 * @描述: http 请求
 */
import axios from "axios";
import loading from "@js/plugins/loading";
import { ElMessage } from "element-plus";

export default function (requestConfig) {
    // 自定义非axios的配置
    const customerOptions = {
        // 是否让框架自动显示错误提示信息
        isShowError: true,
        //是否处理返回的response数据，默认系统框架会处理数据
        isResultData: true,
        // 是否显示loading加载
        isShowLoading: false
    };

    // 自定义拦截器配置
    const customerInterceptor = {
        before: function () {
            return Promise.resolve(true);
        }, // 开始请求数据时的函数，返回Promise,如果是false就不再去请求数据
        request: {
            // 在发送请求之前的函数
            before: function (axiosConfig) {
                //如果配置传入显示加载选项就显示加载项
                if (axiosConfig.isShowLoading === true) {
                    axiosConfig.showLoadingTimerId = window.setTimeout(() => {
                        delete axiosConfig.showLoadingTimerId;
                        loading.show();
                    }, 300);
                }
                return axiosConfig;
            },
            // 在发送请求之前的error函数
            error: function (error) {
                if (error.config) {
                    // 直接JSON error对象在app环境中会报错，现在只能做config、xhr实例
                    logs.warn("接口出错:" + JSON.stringify({ config: error.config }));
                }
                //请求错误时做些事
                return Promise.reject(error);
            }
        },
        response: {
            // 在响应请求数据的函数
            before: function (response) {
                //对响应数据做些事
                //如果配置传入显示加载选项就显示加载项
                if (response.config.isShowLoading === true) {
                    if (response.config.showLoadingTimerId) {
                        clearTimeout(response.config.showLoadingTimerId);
                    } else {
                        loading.hide();
                    }
                }
                if (response.config.responseType === "blob") {
                    return response;
                } else if (response.data.flag === "S") {
                    return response.config.isResultData ? response.data.data : response.data;
                } else {
                    if (response.config.isShowError) {
                        ElMessage({
                            message: response.data.msg || "很抱歉，服务出错，请稍后再试~",
                            type: "error"
                        });
                        logs.warn("接口出错:" + JSON.stringify(response.data));
                    }
                    return Promise.reject(response.data);
                }
            },
            // 在发送请求数据的error函数
            error: function (error) {
                //请求错误时做些事
                const xhr = error.response && error.response.data;
                if (error.config.isShowError) {
                    let errorMessage = "";
                    if (!errorMessage) {
                        switch (error.request.status) {
                            case 401:
                            case 403:
                                errorMessage = "当前账户信息有问题，请重新登录";
                                break;
                            case 404:
                                errorMessage = "没有找到该请求接口!";
                                break;
                            case 405:
                                errorMessage = "请求的资源不支持!";
                                break;
                            case 500:
                            case 502:
                                errorMessage = (xhr && xhr.error && (xhr.error.details || xhr.error.message)) || "服务器出错";
                                break;
                            case 503:
                                errorMessage = "哦～服务器宕机了";
                                break;
                            default:
                                errorMessage = "内部服务错误！";
                                break;
                        }
                    }
                    ElMessage({
                        message: errorMessage,
                        type: "error"
                    });
                    logs.debug(errorMessage);
                }

                //如果配置传入显示加载选项就显示加载项
                if (error.config.isShowLoading === true) {
                    if (error.config.showLoadingTimerId) {
                        clearTimeout(error.config.showLoadingTimerId);
                    } else {
                        loading.hide();
                    }
                }
                if (error.config) {
                    // 直接JSON error对象在app环境中会报错，现在只能做config、xhr实例
                    logs.warn("接口出错:" + JSON.stringify({ config: error.config, data: xhr }));
                }
                return Promise.reject(xhr);
            }
        }
    };
    // 自定义Axios配置项
    const customerAxiosOptions = {
        // 将被添加到`url`前面，除非`url`是绝对的。
        baseURL: config.webApiDomain,
        //是发出请求时使用的请求方法
        method: "POST",
        //请求超时时间
        timeout: 60000,
        //服务器返回的数据类型
        responseType: "json",
        //定义允许的http响应内容的最大大小
        maxContentLength: 200000,
        transformRequest: [
            function (data, headers) {
                if (!data) {
                    return data;
                }
                if (headers["Content-Type"] == "application/x-www-form-urlencoded") {
                    // 将数据转换为表单数据
                    const formData = [];
                    Object.keys(data).forEach(key => {
                        formData.push(encodeURIComponent(String(key)) + "=" + encodeURIComponent(String(data[key])));
                    });
                    return formData.join("&");
                } else if (headers["Content-Type"].indexOf("multipart/form-data") != -1) {
                    return data;
                }
                return JSON.stringify(data);
            }
        ],
        // `auth'表示应该使用 HTTP 基本认证，并提供凭据。
        // 这将设置一个`Authorization'头，覆盖任何现有的`Authorization'自定义头，使用`headers`设置。
        //auth: {},
        //指示是否跨站点访问控制请求,应该是用证书
        withCredentials: false,
        validateStatus: function (status) {
            return status >= 200 && status < 300; // default
        },
        //作为请求主体发送的数据,仅适用于请求方法“PUT”，“POST”和“PATCH”
        // data: {},
        //作为get请求数据参数对象
        params: {},
        //要发送的自定义 headers,{'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/x-www-form-urlencoded'},
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*"
        }
    };
    const instance = axios.create(customerAxiosOptions);
    //添加请求拦截器
    instance.interceptors.request.use(
        function (axiosConfig) {
            if (customerInterceptor.request && customerInterceptor.request.before) {
                return customerInterceptor.request.before(axiosConfig);
            }
            return axiosConfig;
        },
        function (error) {
            if (customerInterceptor.request && customerInterceptor.request.error) {
                return customerInterceptor.request.error(error);
            }
            return error;
        }
    );

    //添加响应拦截器
    instance.interceptors.response.use(
        function (response) {
            if (customerInterceptor.response && customerInterceptor.response.before) {
                return customerInterceptor.response.before(response);
            }
            return response;
        },
        function (error) {
            if (customerInterceptor.response && customerInterceptor.response.error) {
                return customerInterceptor.response.error(error);
            }
        }
    );
    return instance(Object.assign({}, customerOptions, requestConfig));
}

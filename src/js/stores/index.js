/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2022-10-21 16:49:16
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2022-10-25 20:19:14
 * @项目的路径: \360-manager-H5\src\js\stores\index.js
 * @描述: 应用数据状态管理入口
 */
import { createPinia } from "pinia";
import eventsStore from "./events";
import storageStore from "./storage";
import dataStore from "./data";

const store = createPinia();

export default store;

// export function useStore(app) {
//     app.use(store);
// }

export { eventsStore, storageStore, dataStore };

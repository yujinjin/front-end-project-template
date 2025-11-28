/*
 * @创建者: yujinjin9@126.com
 * @描述: app数据管理入口文件
 */
import { createPinia } from "pinia";
import useEventsStore from "./event";
import useDataStore from "./data";
import useStorageStore from "./storage";
import useFootbarStore from "./footbar";
import useNavbarStore from "./navbar";

const store = createPinia();

export default store;

// export function useStore(app) {
//     app.use(store);
// }

export { useEventsStore, useStorageStore, useDataStore, useFootbarStore, useNavbarStore };

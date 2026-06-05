/*
 * @创建者: yujinjin9@126.com
 * @描述: search-page组件入口
 */
import SearchPage from "./search-page.vue";
import type SearchPageType from "./search-page.vue";

export * from "./search-page.ts";

export { SearchPage };

export default SearchPage;

export type SearchPageInstance = InstanceType<typeof SearchPageType>;

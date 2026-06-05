/*
 * @创建者: yujinjin9@126.com
 * @描述: search-field组件入口
 */
import SearchField from "./search-field.vue";
import type SearchFieldType from "./search-field.vue";

export * from "./search-field.ts";

export { SearchField };

export default SearchField;

export type SearchFieldInstance = InstanceType<typeof SearchFieldType>;

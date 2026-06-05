/*
 * @创建者: yujinjin9@126.com
 * @描述: search-form组件入口
 */
import SearchForm from "./search-form.vue";
import type SearchFormType from "./search-form.vue";

export * from "./search-form";

export { SearchForm };

export default SearchForm;

export type SearchFormInstance = InstanceType<typeof SearchFormType>;

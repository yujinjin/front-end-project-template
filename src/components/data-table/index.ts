/*
 * @创建者: yujinjin9@126.com
 * @描述: data-table组件入口
 */
import DataTable from "./data-table.vue";
import type DataTableType from "./data-table.vue";

export * from "./data-table.ts";

export { DataTable };

export default DataTable;

export type DataTableInstance = InstanceType<typeof DataTableType>;

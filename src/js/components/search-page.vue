<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2022-10-24 10:31:46
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2023-06-06 18:03:18
 * @项目的路径: \front-end-project-template\src\js\components\search-page.vue
 * @描述: 搜索页组件
-->
<template>
    <div class="search-page" v-loading="isLoadingForInit">
        <search-form v-if="searchFormProps" v-bind="searchFormProps" :pageName="pageName" :isSearchLoading="isSearchLoading" @search="searchHandle" @change="searchValueChangeHandle"
            @reset="resetHandle" @fieldsChange="searchFieldsChangeHandle" ref="searchFormRef">
            <template v-for="name in distributeSlots.searchForm" #[name]="scope">
                <slot :name="name" v-bind="scope"></slot>
            </template>
        </search-form>
        <action-bar v-if="actionBarProps" v-bind="actionBarProps" :pageName="pageName" :selectRows="selectRows" ref="actionBarRef">
            <template v-for="name in distributeSlots.actionBar" #[name]="scope">
                <slot :name="name" v-bind="scope"></slot>
            </template>
        </action-bar>
        <data-table v-if="dataTableInnerProps" v-bind="dataTableInnerProps" :pageName="pageName" :filters="searchFormInput" ref="dataTableRef" v-model:selectRows="selectRows"
            :autoInitQuery="!isLoadingForInit" @search="isLoading => (isSearchLoading = isLoading)">
            <template v-for="name in distributeSlots.dataTable" #[name]="scope">
                <slot :name="name" v-bind="scope"></slot>
            </template>
        </data-table>
        <slot></slot>
    </div>
</template>
<script setup>
import { ref, useSlots, computed, watch, nextTick, onMounted } from "vue";
import extend from "@js/utils/extend";

const props = defineProps({
    // 初始化时正在加载(用于dataTable组件初始化是否默认查询，适用场景：筛选项中需要先查询数据后来初始化筛选项值)
    isLoadingForInit: {
        type: Boolean,
        default: false
    },
    // search-form 组件属性
    searchFormProps: {
        type: Object
    },
    // action-bar 组件属性
    actionBarProps: {
        type: Object
    },
    // data-table 组件属性
    dataTableProps: {
        type: Object
    },
    // 页面名称，用于获取有权限的按钮数据
    pageName: String
});

const emits = defineEmits(["searchValueChange", "searchFieldsChange", "selectRowsChange", "resetFields"]);

const slots = useSlots();

// 当前搜索条件的表单值
const searchFormInput = ref(extend(true, {}, props.dataTableProps && props.dataTableProps.filters));

// datatable组件ref
const dataTableRef = ref(null);

// searchForm组件ref
const searchFormRef = ref(null);

// actionBar组件Ref
const actionBarRef = ref(null);

// 当前搜索是否正在加载中
const isSearchLoading = ref(false);

// 选择的数据列
const selectRows = ref([]);

// 把插槽分组放入对应的组件里。以searchForm_开头放入到searchForm组件，actionBar_开头放入到actionBar组件，dataTable_开头放入到dataTable组件
const distributeSlots = computed(() => {
    const typeSlotList = {
        searchForm: [],
        actionBar: [],
        dataTable: []
    };
    Object.keys(slots).forEach(key => {
        if (key.startsWith("searchForm_")) {
            typeSlotList.searchForm.push(key);
        } else if (key.startsWith("actionBar_")) {
            typeSlotList.actionBar.push(key);
        } else if (key.startsWith("dataTable_")) {
            typeSlotList.dataTable.push(key);
        }
    });
    return typeSlotList;
});

// data-table 组件属性
const dataTableInnerProps = ref(null);

// 初始化data-table 组件属性
const initDataTableInnerProps = function () {
    if (!props.dataTableProps) {
        dataTableInnerProps.value = null;
        return;
    }
    dataTableInnerProps.value = Object.assign(dataTableInnerProps.value || {}, props.dataTableProps);
    if (dataTableInnerProps.value.autoInitQuery === undefined) {
        dataTableInnerProps.value.autoInitQuery = !props.isLoadingForInit;
    }
};

// 搜索表单的值变化事件
const searchValueChangeHandle = function (field, formFields) {
    emits("searchValueChange", field, formFields);
};

// 搜索表单的字段变化事件
const searchFieldsChangeHandle = function (formFields) {
    emits("searchFieldsChange", formFields);
};

// 搜索表单的字段重置
const resetHandle = function (formFields) {
    emits("resetFields", formFields);
};

// 查询方法
const queryDataList = function (isInit = true) {
    dataTableRef.value?.queryDataList(isInit);
};

// 搜索操作
const searchHandle = async function (searchFormValue) {
    searchFormInput.value = extend(true, {}, props.dataTableProps && props.dataTableProps.filters, searchFormValue);
    await nextTick();
    queryDataList();
};

watch(
    () => selectRows.value,
    () => {
        emits("selectRowsChange", selectRows.value);
    },
    {
        deep: true
    }
);

watch(
    () => props.dataTableProps,
    () => {
        initDataTableInnerProps();
    },
    {
        immediate: true,
        deep: true
    }
);

const unwatch = watch(
    () => props.isLoadingForInit,
    async value => {
        unwatch();
        if (value) return;
        await nextTick();
        searchHandle(searchFormRef.value?.getValue() || {});
    }
);

onMounted(() => {
    if (searchFormRef.value) {
        searchHandle(searchFormRef.value.getValue());
    }
    emits("selectRowsChange", selectRows.value);
});

defineExpose({
    // 分页查询
    query: queryDataList,
    // 获取当前搜索表单实时值
    getSearchingValue: function () {
        if (searchFormRef.value) {
            return extend(true, {}, props.dataTableProps && props.dataTableProps.filters, searchFormRef.value.getValue());
        }
        return extend(true, {}, searchFormInput.value);
    },
    // 获取当前已经搜索出来的结果值，与getSearchFormValue区别是当前已经用它查询出来结果的搜索表单值
    getSearchedValue: function () {
        return extend(true, {}, searchFormInput.value);
    },
    // 修改当前form字段的属性
    changeFormFields: function (callback) {
        searchFormRef.value?.changeFormFields(callback);
    },
    // 修改当前生成的button按钮值
    changeButtons: function (callback) {
        actionBarRef.value?.changeButtons(callback);
    }
});
</script>
<style lang="less" scoped>
.search-page {
    display: flex;
    flex-direction: column;
    height: 100%;
}
</style>

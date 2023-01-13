<script setup>
import { AtInput } from "atmosphere-ui";
import IconSort from "@/components/icons/IconSort.vue";
import IconSearch from "@/components/icons/IconSearch.vue";
import { ref } from "vue";
import IconClose from "./icons/IconClose.vue";
import { useDebounceFn } from "@vueuse/shared";
import AppSearchFilters from "./AppSearchFilters.vue";

const props = defineProps({
  filters: {
    type: Object,
  },
  sorts: {
    type: Object,
  },
  modelValue: {
    type: String,
  },
  placeholder: {
    type: String,
    default: "Search...",
  },
  hasFilters: {
    type: Boolean,
  },
});

const emit = defineEmits([
  "update:sorts",
  "update:filters",
  "update:modelValue",
  "clear",
  "blur",
  "focus",
]);

const sort = (field) => {
  const sortField = props.sorts[field];
  const direction = ["desc", ""].includes(sortField.direction) ? `asc` : "desc";
  emit("update:sorts", {
    ...props.sorts,
    [field]: {
      ...sortField,
      value: true,
      direction,
    },
  });
  visibleOption.value = "";
};

const filter = (name, value) => {
  emit("update:filters", {
    ...props.filters,
    [name]: {
      ...props.filters[name],
      value,
    },
  });
  visibleOption.value = "";
};

const visibleOption = ref("");
const isVisibleOption = (optionName) => {
  return optionName == visibleOption.value;
};

const resetFilters = () => {
  emit("clear");
  visibleOption.value = "";
};

const handleInput = useDebounceFn((searchText) => {
  emit("update:modelValue", searchText);
}, 200);
</script>

<template>
  <div class="flex rounded-md bg-gray-200 w-full h-12 border">
    <AtInput
      v-if="!visibleOption"
      class="rounded-md bg-gray-200 w-full h-12"
      :is-borderless="true"
      input-class="overflow-visible"
      :placeholder="placeholder"
      :model-value="modelValue"
      @update:modelValue="handleInput"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
    >
      <template #prefix>
        <button class="rounded-l-md px-2 hover:bg-gray-50 md:px-4">
          <IconSearch />
        </button>
      </template>
      <template #suffix>
        <button
          title="Reset all filters"
          class="hover:bg-red-400 bg-gray-100 h-6 transition-all mr-4 flex items-center justify-center w-6 my-auto hover:text-white px-2 rounded-full"
          @click="resetFilters()"
          v-if="hasFilters"
        >
          <IconClose />
        </button>
      </template>
    </AtInput>
    <AppSearchFilters
      v-if="!isVisibleOption('filter')"
      class="flex space-x-4 items-center"
      title="Sort by"
      :is-active="isVisibleOption('sort')"
      :filters="sorts"
      :fields="['title', 'releaseYear']"
      @open="visibleOption = 'sort'"
      @close="visibleOption = null"
    >
      <template #releaseYear>
        <button
          class="hover:bg-gray-50 px-2 flex h-full items-center"
          @click="sort('releaseYear')"
        >
          <IconSort /> Year
        </button>
      </template>

      <template #title>
        <button
          class="hover:bg-gray-50 px-2 flex items-center"
          @click="sort('title')"
        >
          <IconSort /> Name
        </button>
      </template>

      <template #icon>
        <IconSort />
      </template>
    </AppSearchFilters>
    <AppSearchFilters
      class="flex space-x-4 items-center"
      v-if="!isVisibleOption('sort')"
      :is-active="isVisibleOption('filter')"
      :fields="['releaseYear', 'programType']"
      :filters="filters"
      @open="visibleOption = 'filter'"
      @close="visibleOption = null"
      @select="filter"
    />
  </div>
</template>

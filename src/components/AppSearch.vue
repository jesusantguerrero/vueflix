<script setup>
import { AtInput } from "atmosphere-ui";
import IconFilter from "@/components/icons/IconFilter.vue";
import IconSort from "@/components/icons/IconSort.vue";
import IconSearch from "@/components/icons/IconSearch.vue";
import { ref } from "vue";
import IconClose from "./icons/IconClose.vue";
import { useDebounceFn } from "@vueuse/shared";

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
  <AtInput
    class="rounded-md bg-gray-200 w-full h-10"
    :placeholder="placeholder"
    :model-value="modelValue"
    @update:modelValue="handleInput"
    @focus="$emit('focus')"
    @blur="$emit('blur')"
  >
    <template #prefix>
      <button class="rounded-l-md px-2 hover:bg-gray-50 md:px-4"><IconSearch /></button>
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
      <section
        class="actions flex rounded-r-md"
        v-if="!isVisibleOption('filter')"
      >
        <section class="flex">
          <template v-if="isVisibleOption('sort')">
            <span
              class="w-20 font-semibold text-gray-600 h-full flex items-center"
            >
              Sort by:
            </span>
            <button
              class="hover:bg-gray-50 px-2 flex h-full items-center"
              @click="sort('releaseYear')"
            >
              <IconSort /> Year
            </button>
            <button
              class="hover:bg-gray-50 px-2 flex items-center"
              @click="sort('title')"
            >
              <IconSort /> Name
            </button>
          </template>
          <button
            class="hover:bg-gray-50 px-2"
            @click="visibleOption = 'sort'"
            v-else
          >
            <IconSort />
          </button>
        </section>
      </section>
      <section class="flex" v-if="!isVisibleOption('sort')">
        <template v-if="isVisibleOption('filter')">
          <span
            class="w-20 font-semibold text-gray-600 h-full flex items-center"
          >
            Filter by:
          </span>
          <select
            :value="filters.releaseYear.value"
            @click.stop
            @change.stop="filter('releaseYear', $event.target.value)"
            placeholder="Select Year"
          >
            <option value="2016">2016</option>
            <option value="2013">2013</option>
          </select>
          <select
            :value="filters.programType.value"
            @click.stop
            placeholder="Select program type"
            @change.stop="filter('programType', $event.target.value)"
          >
            <option value="series">Series</option>
            <option value="movie">Movie</option>
          </select>
        </template>
        <button
          v-else
          class="hover:bg-gray-50 px-2"
          @click="visibleOption = 'filter'"
        >
          <IconFilter />
        </button>
      </section>
    </template>
  </AtInput>
</template>

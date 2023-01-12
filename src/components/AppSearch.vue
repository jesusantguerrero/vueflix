<script setup>
import { AtInput, AtSelect } from "atmosphere-ui";
import IconFilter from "@/components/icons/IconFilter.vue";
import IconSort from "@/components/icons/IconSort.vue";
import IconSearch from "@/components/icons/IconSearch.vue";
import { ref } from "vue";

const props = defineProps({
  filters: {
    type: Object,
  },
  sorts: {
    type: String,
  },
  searchText: {
    type: String,
  },
  placeholder: {
    type: String,
  },
});

const emit = defineEmits([
  "update:sorts",
  "update:filters",
  "update:modelValue",
]);

const sort = (field) => {
  const defaultOrder = `${field}&_order=asc`;
  const sortText =
    props.sorts == defaultOrder ? `${field}&_order=desc` : defaultOrder;
  emit("update:sorts", sortText);
  visibleOption.value = "";
};

const filter = (name, value) => {
  emit("update:filters", { ...props.filters, [name]: value });
};

const visibleOption = ref("");
const isVisibleOption = (optionName) => {
  return optionName == visibleOption.value;
};

const resetFilters = () => {
  visibleOption.value = "";
  emit("update:filters", {
    releaseYear: "",
    programType: "",
  });
  emit("update:sorts", "");
};
</script>

<template>
  <AtInput
    class="rounded-md bg-gray-200 w-full h-10"
    :placeholder="placeholder"
  >
    <template #prefix>
      <button class="rounded-l-md hover:bg-gray-50 px-4"><IconSearch /></button>
    </template>
    <template #suffix>
      <section class="actions flex rounded-r-md">
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
            :value="filters.releaseYear"
            @click.stop
            @change.stop="filter('releaseYear', $event.target.value)"
            placeholder="Select Year"
          >
            <option value="2016">2016</option>
            <option value="2013">2013</option>
          </select>
          <select
            :value="filters.programType"
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
      <button
        title="Reset all filters"
        class="hover:bg-red-400 hover:text-white px-2"
        @click="resetFilters()"
      >
        X
      </button>
    </template>
  </AtInput>
</template>

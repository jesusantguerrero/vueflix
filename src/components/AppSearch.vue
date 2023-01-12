<script setup>
import { AtInput } from "atmosphere-ui";
import IconFilter from "@/components/icons/IconFilter.vue";
import IconSort from "@/components/icons/IconSort.vue";
import IconSearch from "@/components/icons/IconSearch.vue";

defineProps({
  filters: {
    type: Object,
  },
  sorts: {
    type: Array,
  },
  searchText: {
    type: String,
  },
  placeholder: {
    type: String,
  },
});
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
        <button class="hover:bg-gray-50 px-2"><IconSort /></button>
        <button class="hover:bg-gray-50 px-2"><IconFilter /></button>
      </section>
    </template>
  </AtInput>
</template>

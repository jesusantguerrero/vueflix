<script setup>
import ProgramItem from "@/components/ProgramItem.vue";

defineProps({
  title: {
    type: String,
  },
  emptyResultsText: {
    type: String,
    default:
      "We couldn't find result for this search, please try again with other parameters",
  },
  results: {
    type: Array,
  },
});
</script>

<template>
  <section class="px-4 md:px-0">
    <h2 class="font-bold text-gray-500 text-lg">{{ title }}</h2>
    <section class="grid md:grid-cols-4 gap-4 md:gap-2 mt-4">
      <ProgramItem
        v-for="program in results"
        :key="program.id"
        :program="program"
      />
    </section>
    <p class="text-gray-400 text-center text-3xl mt-4" v-if="!results.length">
      {{ emptyResultsText }}
    </p>
  </section>
</template>

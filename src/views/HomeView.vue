<script setup>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import ProgramItem from "@/components/ProgramItem.vue";
import AppSearch from "@/components/AppSearch.vue";
import { useFilters } from "@/composables/useFilters";

const store = useStore();

const series = computed(() => {
  return store.getters["movies/series"].slice(1, 5);
});

const state = useFilters((finalUrl) => {
  console.log(finalUrl);
})

onMounted(() => {
  store.dispatch("movies/fetchMovies");
});
</script>

<template>
  <main class="max-w-7xl mx-auto space-y-4 pb-50 py-4">
    <AppSearch
      v-model="searchText"
      v-model:filters="state.filters"
      v-model:sorts="state.sorts"
    />

    <section class="max-w-7xl mx-auto mt-12">
      <h2 class="font-bold text-gray-500 text-lg">Series</h2>
      <section class="grid md:grid-cols-4 gap-2 mt-4">
        <ProgramItem
          v-for="program in series"
          :key="program.id"
          :program="program"
          class="h-32"
          image-only
        />
      </section>
    </section>
    <section class="mt-4">
      <h2 class="font-bold text-gray-500 text-lg">All</h2>
      <section class="grid md:grid-cols-4 gap-2 mt-4">
        <ProgramItem
          v-for="program in store.state.movies.data"
          :key="program.id"
          :program="program"
        />
      </section>
    </section>
  </main>
</template>

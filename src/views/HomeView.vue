<script setup>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import ProgramItem from "@/components/ProgramItem.vue";
import AppSearch from "@/components/AppSearch.vue";
import { useFilters } from "@/composables/useFilters";
import AppSearchFilterLabels from "../components/AppSearchFilterLabels.vue";
import AppLayout from "./Partials/AppLayout.vue";

const store = useStore();

// Initial load
const series = computed(() => {
  return store.getters["movies/series"].slice(1, 5);
});

onMounted(() => {
  store.dispatch("movies/fetchMovies");
});

//  Search behavior
const displaySearch = computed(() => {
  return store.getters["movies/shouldDisplayResults"];
});

const sectionTitle = computed(() => {
  return displaySearch.value ? "Search results:" : "All programs";
});

const results = computed(() => {
  return store.getters["movies/results"];
});

const { filters, sorts, searchText, reset } = useFilters((finalUrl) => {
  store.dispatch("movies/executeSearch", finalUrl);
});
</script>

<template>
  <AppLayout>
    <!-- To set the search in the header let the controls here -->
    <template #header>
      <AppSearch
        v-model="searchText"
        v-model:filters="filters"
        v-model:sorts="sorts"
        class="w-full"
        :has-filters="displaySearch"
        @clear="reset()"
      />
    </template>

    <main class="max-w-7xl mx-auto space-y-4 pb-50 py-4">
      <!-- Let's show the current filters -->
      <AppSearchFilterLabels v-model:filters="filters" v-model:sorts="sorts" />

      <!-- Lets get some fun showing spotlight -->
      <template v-if="!displaySearch">
        <section class="max-w-7xl mx-auto mt-12">
          <h2 class="font-bold text-gray-500 text-lg">Series</h2>
          <section class="grid md:grid-cols-4 gap-2 mt-4">
            <ProgramItem
              v-for="(program, index) in series"
              :key="`${program.title}-${index}`"
              :program="program"
              class="h-32"
              image-only
            />
          </section>
        </section>
      </template>

      <!-- The rest of the list an search results -->
      <section class="mt-4">
        <h2 class="font-bold text-gray-500 text-lg">{{ sectionTitle }}</h2>
        <section class="grid md:grid-cols-4 gap-2 mt-4">
          <ProgramItem
            v-for="program in results"
            :key="program.id"
            :program="program"
          />
        </section>
      </section>
    </main>
  </AppLayout>
</template>

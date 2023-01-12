<script setup>
import { onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();

onMounted(() => {
  store.dispatch("movies/fetchMovies");
});
</script>

<template>
  <main>
    The maravish
    <section class="grid">
      <div class="" v-for="movie in store.state.movies.data" :key="movie.id">
        {{ movie }}
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed, ref } from "vue";
import VLazyImage from "v-lazy-image";

const props = defineProps({
  program: {
    type: Object,
  },
  imageOnly: {
    type: Boolean,
  },
});

const hasImageErrors = ref(false);
const handleLoadError = () => {
  hasImageErrors.value = true;
};

const imageUrl = computed(() => {
  return hasImageErrors.value ? null : props.program.images["Poster Art"].url;
});
</script>

<template>
  <article class="group rounded-md overflow-hidden border shadow-md group">
    <div
      class="w-full text-gray-200 font-bold h-44 flex items-center justify-center bg-gradient-to-br from-red-400 to-red-800 overflow-hidden relative cursor-pointer"
    >
      <v-lazy-image
        v-if="!hasImageErrors"
        :src="imageUrl"
        @error="handleLoadError"
        @onload="handledLoaded"
        class="w-full h-full group-hover:scale-110 transform ease-in-out transition-transform object-cover object-center"
        :alt="program.title"
      />
      <span v-else class="px-4"> {{ program.title }} </span>
    </div>
    <section class="px-4 py-2" v-if="!imageOnly">
      <h4 class="font-bold text-gray-600">
        {{ program.title }}
      </h4>
      <p class="text-gray-500 italic mt-4">{{ program.description }}</p>
      <footer class="mt-2 flex justify-between text-gray-400">
        <p>
          <span class="italic"> Released: </span>
          <span class="text-red-400 font-bold">
            {{ program.releaseYear }}
          </span>
        </p>
        <span class="capitalize text-gray-600">{{ program.programType }}</span>
      </footer>
    </section>
  </article>
</template>

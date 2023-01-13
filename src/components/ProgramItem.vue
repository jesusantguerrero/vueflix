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

const isHovered = ref(false);
const title = computed(() => {
  return !isHovered.value
    ? props.program.title.slice(0, 32) + "..."
    : props.program.title;
});
</script>

<template>
  <article
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
    class="group rounded-md overflow-hidden border shadow-md group relative"
  >
    <div
      class="w-full text-gray-200 font-bold h-72 flex items-center justify-center bg-gradient-to-br from-red-400 to-red-800 overflow-hidden relative cursor-pointer"
    >
      <v-lazy-image
        v-if="!hasImageErrors"
        :src="imageUrl"
        @error="handleLoadError"
        @onload="handledLoaded"
        class="w-full h-full group-hover:scale-110 transform ease-in-out transition-transform object-cover object-top"
        :alt="program.title"
      />
      <span v-else class="px-4"> {{ program.title }} </span>
    </div>
    <section
      class="w-full ease-linear group-hover:pb-20 cursor-pointer group-hover:top-0 transition px-4 py-4 bg-gradient-to-b from-transparent via-gray-800 to-gray-900 absolute text-white top-52"
      v-if="!imageOnly"
    >
      <h4 class="font-bold w-full flex overflow-ellipsis">
        {{ title }}
      </h4>
      <p class="hidden group-hover:block text-gray-200 italic mt-4">
        {{ program.description }}
      </p>
      <footer class="flex group-hover:mt-8 justify-between text-gray-200">
        <p>
          <span class="italic"> Released: </span>
          <span class="text-red-400 font-bold">
            {{ program.releaseYear }}
          </span>
        </p>
        <span class="capitalize text-gray-200">{{ program.programType }}</span>
      </footer>
    </section>
  </article>
</template>

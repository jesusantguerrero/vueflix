<script setup>
defineProps({
  program: {
    type: Object,
  },
  imageOnly: {
    type: Boolean,
  },
});
</script>

<template>
  <article
    class="rounded-md overflow-hidden border shadow-md group"
    :key="program.id"
  >
    <div
      class="w-full h-44 bg-gray-300 overflow-hidden relative cursor-pointer"
    >
      <img
        :src="program.images['Poster Art'].url"
        class="w-full h-full object-cover object-center"
      />
      <div
        v-if="imageOnly"
        class="transition px-4 py-2 absolute animate-ease-[cubic-bezier(0.25,0.1,0.25,1)] animate-bubble -top-52 bg-gray-300 h-full w-full z-10 group-hover:top-0 overflow-ellipsis"
      >
        <h4 class="font-bold text-gray-600">
          {{ program.title }}
        </h4>
        <p>{{ program.description }}</p>
      </div>
    </div>
    <section class="px-4 py-2" v-if="!imageOnly">
      <h4 class="font-bold text-gray-600">
        {{ program.title }}
      </h4>
      <p>{{ program.description }}</p>
      <footer class="mt-2 flex justify-between">
        Released: {{ program.releaseYear }}
        <span class="capitalize">{{ program.programType }}</span>
      </footer>
    </section>
  </article>
</template>

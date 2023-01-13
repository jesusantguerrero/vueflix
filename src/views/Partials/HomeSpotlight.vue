<script setup>
import { AtButton } from "atmosphere-ui";
</script>

<template>
  <div
    class="md:rounded-md h-96 bg-cover w-full relative"
    :style="{
      backgroundImage:
        'url(https://streamcoimg-a.akamaihd.net/000/115/93/11593-PosterArt-33274b61ab0cb0e19cb7bff35824efb9.jpg)',
    }"
  >
    <div
      class="w-full h-full absolute bg-gradient-to-b from-transparent  via-white/40 to-white"
    ></div>
    <footer
      class="px-4 py-2 absolute bottom-8 flex flex-col md:flex-row justify-between w-full md:order-1"
    >
      <AtButton
        class="text-white mt-10 font-bold hover:scale-105 transform md:mt-0 order-2 min-w-fit h-12 bg-red-600 rounded-md"
      >
        Watch now
      </AtButton>

      <h4
        class="text-4xl md:text-gray-600 text-red-500 font-bold order-1 md:order-2"
      >
        Sherlock: The Abominable Bride
      </h4>
    </footer>
  </div>
</template>
